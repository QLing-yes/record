/** 文件路径转树对象
 * @param pathArray 文件路径路径
 * @param splitPath 路径分割符
 * @param splitExt 文件分隔符
 */
function pathToTree(pathArray: string[], splitPath = "\\", splitExt = ".") {
    const tree = {};
    // 构建树结构的辅助函数
    const buildTree = (path, node) => {
        const segments = path.split(splitPath);
        let currentLevel = node;
        segments.forEach(segment => {
            const dotI = segment.lastIndexOf(splitExt);
            if (splitExt && dotI !== -1) {// 文件
                let name = segment.slice(0, dotI);
                // let ext = segment.slice(dotI + 1, segment.length);
                currentLevel[name] = currentLevel[name] || segment;
                currentLevel = currentLevel[name];
            } else {// 目录
                currentLevel[segment] = currentLevel[segment] || {};
                currentLevel = currentLevel[segment];
            }
        })
    };
    // 遍历路径数组并构建树结构
    pathArray.forEach(path => buildTree(path, tree));
    console.log('-pathToTree()-',tree);
    
    return tree;
}
import path from 'path';
import { globSync } from 'glob';

const root = process.cwd() + "/docs";

function toTree(op) {
    const onDir = path.join(root, op.path);
    const mdfiles = globSync([onDir + '/**/*.md'], { ignore: 'node_modules/**' })
    const Tree = pathToTree(mdfiles)['docs']['notes'] as object;
console.log('-Tree-',Tree);

    let dirItems: any[] = [];

    const deep = (path: string, obj: object) => {
        let arr: any[] = [];
        for (const item of Object.entries(obj)) {
            let data: Record<string, any> = { text: item[0] }
            if (typeof item[1] == "string") data.link = `${path}/${item[0]}`
            else {
                data.collapsed = false;
                data.items = deep(`${path}/${item[0]}`, item[1]);
            }
            arr.push(data);
        }
        return arr;
    }
    dirItems = deep(op.path, Tree);

    // console.log(dirItems);
    return dirItems;
}

export default toTree;

// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue';
import mediumZoom from 'medium-zoom';//图片预览
import giscusTalk from 'vitepress-plugin-comment-with-giscus';//支持giscus评论系统的UI
import { useData, useRoute } from 'vitepress';
import "./style.css"
import "./style/var.css"

export default {
    extends: DefaultTheme,

    setup() {
        const { frontmatter } = useData();
        const route = useRoute();
        // giscus配置
        giscusTalk({
            repo: 'QLing-yes/record', //仓库
            repoId: 'R_kgDOLoKudA', //仓库ID
            category: 'Announcements', // 讨论分类
            categoryId: 'DIC_kwDOLoKudM4CeXuN', //讨论分类ID
            mapping: 'pathname',
            inputPosition: 'bottom',
            lang: 'zh-CN',
        }, {
            frontmatter, route
        },
            //默认值为true，表示已启用，此参数可以忽略；
            //如果为false，则表示未启用
            //您可以使用“comment:true”序言在页面上单独启用它
            true
        );
        //图片预览
        const initZoom = () => {
            // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
            mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
        };
        onMounted(() => {
            initZoom();
        });
        watch(
            () => route.path,
            () => nextTick(() => initZoom())
        );
    },

}
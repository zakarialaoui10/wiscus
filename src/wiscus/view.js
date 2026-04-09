// import Giscus from '@giscus/react'
// import { createRoot } from 'react-dom/client';
import { tags } from 'ziko/dom'
const {giscus_widget} = tags;
import 'giscus';

// console.log(111)

const giscus_roots = [...document.getElementsByClassName('wiscus-discussion')];
giscus_roots.forEach(root => {
    const config = JSON.parse(root.dataset.config  ?? '{}');
    const G = giscus_widget(config);
    G.mount(root)
    // console.log(config);
    // const app_root = createRoot(root);
    // app_root.render(<Giscus {...config} loading="lazy"/>)

})
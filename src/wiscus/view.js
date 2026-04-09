import { tags } from 'ziko/dom'
const {giscus_widget} = tags;
import 'giscus';

const giscus_roots = [...document.getElementsByClassName('wiscus-discussion')];
giscus_roots.forEach(root => {
    const config = JSON.parse(root.dataset.config  ?? '{}');
    const G = giscus_widget(config);
    G.mount(root)
})

console.log({giscus_roots})
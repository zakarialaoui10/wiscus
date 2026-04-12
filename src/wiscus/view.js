import { tags } from 'ziko/dom'
const {giscus_widget} = tags;
import 'giscus';

const giscus_roots = [...document.getElementsByClassName('wiscus-discussion')];
giscus_roots.forEach(root => {
    const config = JSON.parse(root.dataset.config  ?? '{}');
    const G = giscus_widget(config);
    root.innerHTML = ""
    G.mount(root)
})

const channel = new BroadcastChannel('wp-live-reload');

if(channel) channel.onmessage = function (event) {
    if (event.data && event.data.type === 'reload') {
        location.reload();
    }
};




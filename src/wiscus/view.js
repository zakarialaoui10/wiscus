import Giscus from '@giscus/react'
import { createRoot } from 'react-dom/client';

const giscus_roots = [...document.getElementsByClassName('wiscus-discussion')];
giscus_roots.forEach(root => {
    const config = JSON.parse(root.dataset.config  ?? '{}');
    const app_root = createRoot(root);
    app_root.render(<Giscus {...config} loading="lazy"/>)

})
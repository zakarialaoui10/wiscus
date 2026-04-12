import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
    useBlockProps,
    InspectorControls
} from '@wordpress/block-editor';
import {
    PanelBody,
    TextControl,
    SelectControl
} from '@wordpress/components';
import './editor.scss';
import 'giscus';

import themes from "../../data/themes.json"
const theme_options = Object.entries(themes).map(([value, label]) => new Object({label, value}))


export default function Edit({ attributes, setAttributes }) {
    
(function () {
    if (!('BroadcastChannel' in window)) return;

    const channel = new BroadcastChannel('wp-live-reload');
    let wasSaving = false;

    wp.data.subscribe(() => {
        const select = wp.data.select('core/editor');
        if (!select) return;

        const isSaving = select.isSavingPost();
        const isAutosaving = select.isAutosavingPost();

        if (isSaving && !isAutosaving) {
            wasSaving = true;
        }

        if (wasSaving && !isSaving) {
            channel.postMessage({ type: 'reload' });
            console.log('[WP Live Reload] Broadcast sent');
            wasSaving = false;
        }
    });
})();

    const {
        repo,
        repoid,
        category,
        categoryid,
        mapping,
        term,
        theme
    } = attributes;

    const blockProps = useBlockProps();
    const containerRef = useRef(null);

    // Example effect (for future preview rendering if needed)
    useEffect(() => {
        if (containerRef.current) {
            // You could initialize preview logic here
        }
    }, [attributes]);

    return (
        <>
            {/* <InspectorControls> */}
                <PanelBody title={__('Wiscus Settings', 'wiscus')} initialOpen={true}>
                    
                    <TextControl
                        label={__('Repository', 'wiscus')}
                        value={repo}
                        onChange={(value) => setAttributes({ repo: value })}
                        help="e.g. username/repo"
                    />

                    <TextControl
                        label={__('Repository ID', 'wiscus')}
                        value={repoid}
                        onChange={(value) => setAttributes({ repoid: value })}
                    />

                    <TextControl
                        label={__('Category', 'wiscus')}
                        value={category}
                        onChange={(value) => setAttributes({ category: value })}
                    />

                    <TextControl
                        label={__('Category ID', 'wiscus')}
                        value={categoryid}
                        onChange={(value) => setAttributes({ categoryid: value })}
                    />

                    <SelectControl
                        label={__('Mapping', 'wiscus')}
                        value={mapping}
                        options={[
                            { label: 'Title', value: 'title' },
                            { label: 'URL', value: 'url' },
                            { label: 'Pathname', value: 'pathname' },
                            { label: 'Specific Term', value: 'specific' }
                        ]}
                        onChange={(value) => setAttributes({ mapping: value })}
                    />

                    {mapping === 'specific' && (
                        <TextControl
                            label={__('Term', 'wiscus')}
                            value={term}
                            onChange={(value) => setAttributes({ term: value })}
                        />
                    )}

                    <SelectControl
                        label={__('Theme', 'wiscus')}
                        value={theme}
                        options={theme_options}
                        onChange={(value) => setAttributes({ theme: value })}
                    />

                </PanelBody>
            {/* </InspectorControls> */}

            <div {...blockProps}>
                <p>{__('Wiscus comments will appear here on the frontend.', 'wiscus')}</p>

                <div
                    ref={containerRef}
                    className="wiscus-discussion"
                    data-props={JSON.stringify(attributes)}
                >
                <p>{__('Preview not available in editor.', 'wiscus')}</p>
                <giscus-widget {...attributes} loading="lazy"></giscus-widget>
                </div>
            </div>
        </>
    );
}
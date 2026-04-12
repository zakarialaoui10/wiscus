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

export default function Edit({ attributes, setAttributes }) {
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
                        options={[
                            { label: 'Light', value: 'light' },
                            { label: 'Dark', value: 'dark' },
                            { label: 'Preferred Color Scheme', value: 'preferred_color_scheme' },
                            { label: 'Transparent Dark', value: 'transparent_dark' }
                        ]}
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
                </div>
            </div>
        </>
    );
}
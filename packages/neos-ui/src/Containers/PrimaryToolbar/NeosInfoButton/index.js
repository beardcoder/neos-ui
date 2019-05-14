import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@neos-project/react-ui-components/src/IconButton/';
import {neos} from '@neos-project/neos-ui-decorators';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';
import {actions} from '@neos-project/neos-ui-redux-store';

@neos(globalRegistry => ({
    i18nRegistry: globalRegistry.get('i18n')
}))
@connect(
    $transform({isOpen: $get('ui.neosInfoModal.isOpen')}),
    {open: actions.UI.NeosInfoModal.open},
)
export default class NeosInfoButton extends PureComponent {
    static propTypes = {
        i18nRegistry: PropTypes.object.isRequired,
        toggleFullScreen: PropTypes.func
    };

    render() {
        const {i18nRegistry, open} = this.props;

        return (
            <IconButton
                icon="info"
                aria-label={i18nRegistry.translate('Neos.Neos:Main:displayNeosInfos', 'Display Neos Infos')}
                title={i18nRegistry.translate('Neos.Neos:Main:displayNeosInfos', 'Display Neos Infos')}
                onClick={open}
            />
        );
    }
}

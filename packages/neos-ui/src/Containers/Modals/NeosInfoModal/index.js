import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';
import backend from '@neos-project/neos-ui-backend-connector';
import {actions} from '@neos-project/neos-ui-redux-store';
import Dialog from '@neos-project/react-ui-components/src/Dialog/';
import I18n from '@neos-project/neos-ui-i18n';
import {Icon} from '@neos-project/react-ui-components';

import style from './style.css';

@connect(
    $transform({isOpen: $get('ui.neosInfoModal.isOpen')}),
    {close: actions.UI.NeosInfoModal.close},
)

class NeosInfoModal extends PureComponent {
    static propTypes = {
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
    };

    state = {
        infos: {}
    };

    componentDidMount = () => {
        const {getNeosInfo} = backend.get().endpoints;

        getNeosInfo().then(infos => {
            this.setState({infos});
        });
    };

    renderDefinitionEntry = (key, info) => {
        return (
            <React.Fragment key={key}>
                <dt>{info.title}</dt>
                <dd>{info.definition}</dd>
            </React.Fragment>
        );
    };

    render() {
        const {close, isOpen} = this.props;

        return (
            <Dialog
                title={
                    <React.Fragment>
                        <Icon className={style.neosInfoTitle__Icon} icon="fab fa-neos"/>
                        <I18n fallback="Neos Info"/>
                    </React.Fragment>
                }
                isOpen={isOpen}
                onRequestClose={() => close()}
            >
                <div className={style.neosInfoContent}>
                    <div className={style.neosInfoIntroText}>
                        <I18n id={`Neos.Neos.Ui:Main:Info__Introduction`} fallback={''}/>
                    </div>
                    <div className={style.neosInfo}>
                        <dl className={style.neosInfo__list}>
                            {Object.keys(this.state.infos).map(i => this.renderDefinitionEntry(i, this.state.infos[i]))}
                        </dl>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default NeosInfoModal;

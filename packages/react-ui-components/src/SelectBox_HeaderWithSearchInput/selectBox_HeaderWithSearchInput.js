import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import mergeClassNames from 'classnames';

const Fragment = props => props.children;

// TODO: document component usage && check code in detail
export default class SelectBox_HeaderWithSearchInput extends PureComponent {
    static propTypes = {
        searchTerm: PropTypes.string.isRequired,
        onSearchTermChange: PropTypes.func.isRequired,
        placeholder: PropTypes.string.isRequired,
        displayLoadingIndicator: PropTypes.bool,
        setFocus: PropTypes.bool,

        theme: PropTypes.shape({
            selectBox__searchInputContainer: PropTypes.string.isRequired,
            selectBox__searchInput: PropTypes.string.isRequired,
            selectBox__loadingIcon: PropTypes.string.isRequired
        }).isRequired,

        // dependency injection
        Icon: PropTypes.any.isRequired,
        TextInput: PropTypes.any.isRequired
    }

    render() {
        const {
            searchTerm,
            onSearchTermChange,
            placeholder,
            displayLoadingIndicator,
            setFocus,
            theme,
            Icon,
            TextInput
        } = this.props;

        return (
            <Fragment>
                <Icon
                    icon="search"
                    />
                <TextInput
                    containerClassName={theme.selectBox__searchInputContainer}
                    className={theme.selectBox__searchInput}
                    value={searchTerm}
                    onChange={onSearchTermChange}
                    placeholder={placeholder}
                    setFocus={setFocus}
                    type="search"
                    />
                {displayLoadingIndicator ?
                    <Icon className={theme.selectBox__loadingIcon} spin={true} icon="spinner"/> :
                    null
                }
            </Fragment>
        );
    }
}

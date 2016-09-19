var constant = require('./../constants/headerConstants.js');
var utils = require('./../../../common/utils/utils.js');
var appConfig = require('./../../../common/config.js');
var globalPreloaderActions = require('./../../../preloader/actions/preloaderActions.js');
var Logger = require('./../../../common/components/Logger.js');


export function initHeaderContentSuccess(cmsContent) {
    return { type: constant.CMS_CONTENT_SUCCESS, cmsContent };
}
export function updateComponentState(updatedProps) {
    return { type: constant.HEADER_COMPONENT_UPDATE, updatedProps };
}
export function resetAppState() {
    return { type: constant.RESET_APP_STATE };
}
export function resetComponentState(componentName) {
    return { type: "RESET_COMPONENT", componentName }
}

export function showGlobalPreloader() {
    return function(dispatch) {
        dispatch(globalPreloaderActions.showGlobalPreloader());
    }
}
export function hideGlobalPreloader() {
    return function(dispatch) {
        dispatch(globalPreloaderActions.hideGlobalPreloader());
    }
}

export function initHeaderContent() {

    return function(dispatch, state) {
        var headerContentPromise = utils.ajaxGetNoJsonp(appConfig.config.CMS_HEADER_FOOTER_CONTENT_URL);
        headerContentPromise.done(function(cmsContent) {
            dispatch(initHeaderContentSuccess(cmsContent))
        });
        headerContentPromise.fail(function(jqXHR, textStatus, errorThrown) {
            Logger.error('Failed to fetch header content -->' + errorThrown);
        });
    };
}

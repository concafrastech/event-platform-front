import {environment} from '../../environments/environment';

export var GLOBAL = {
    url: environment.apiUrl,
    socketUrl: environment.sockertUrl,
    signatureEndpoint: environment.signatureEndpoint,
    leaveUrl: environment.leaveUrl,
    zoomUrl: environment.zoomUrl
}

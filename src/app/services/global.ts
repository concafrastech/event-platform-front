import {environment} from '../../environments/environment';

export var GLOBAL = {
    url: environment.apiUrl,
    signatureEndpoint: environment.signatureEndpoint,
    leaveUrl: environment.leaveUrl
}

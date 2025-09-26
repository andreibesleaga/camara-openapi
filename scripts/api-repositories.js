// This file is the definitive, audited manifest of all required CAMARA APIs.
// It maps a unique ID to the repository and the exact file path within that repo.
// Last updated and fully validated: 2025-09-26
const apiDefinitions = [
    // == Authentication and Fraud Prevention ==
    { id: 'CustomerInsights', repo: 'CustomerInsights', path: 'code/api-definitions/customer-insights.yaml' },
    { id: 'DeviceSwap', repo: 'DeviceSwap', path: 'code/api-definitions/device-swap.yaml' },
    { id: 'KnowYourCustomerAgeVerification', repo: 'KnowYourCustomerAgeVerification', path: 'code/api-definitions/kyc-age-verification.yaml' },
    { id: 'KnowYourCustomerFill-in', repo: 'KnowYourCustomerFill-in', path: 'code/api-definitions/kyc-fill-in.yaml' },
    { id: 'KnowYourCustomerMatch', repo: 'KnowYourCustomerMatch', path: 'code/api-definitions/kyc-match.yaml' },
    { id: 'Tenure', repo: 'Tenure', path: 'code/api-definitions/kyc-tenure.yaml' },
    { id: 'NumberRecycling', repo: 'NumberRecycling', path: 'code/api-definitions/number-recycling.yaml' },
    { id: 'OTPValidation', repo: 'OTPValidation', path: 'code/api-definitions/one-time-password-sms.yaml' },
    { id: 'CallForwardingSignal', repo: 'CallForwardingSignal', path: 'code/api-definitions/call-forwarding-signal.yaml' },

    // == Location Services ==
    { id: 'Geofencing', repo: 'DeviceLocation', path: 'code/api-definitions/geofencing.yaml' },
    { id: 'LocationRetrieval', repo: 'DeviceLocation', path: 'code/api-definitions/location-retrieval.yaml' },
    { id: 'LocationVerification', repo: 'DeviceLocation', path: 'code/api-definitions/location-verification.yaml' },
    { id: 'PopulationDensityData', repo: 'PopulationDensityData', path: 'code/api-definitions/population-density-data.yaml' },
    { id: 'RegionDeviceCount', repo: 'RegionDeviceCount', path: 'code/api-definitions/region-device-count.yaml' },

    // == Communication Services ==
    { id: 'WebRTCCallHandling', repo: 'WebRTC', path: 'code/api-definitions/webrtc-call-handling.yaml' },
    { id: 'WebRTCEvents', repo: 'WebRTC', path: 'code/api-definitions/webrtc-events.yaml' },
    { id: 'WebRTCRegistration', repo: 'WebRTC', path: 'code/api-definitions/webrtc-registration.yaml' },

    // == Communication Quality ==
    { id: 'ConnectivityInsights', repo: 'ConnectivityInsights', path: 'code/api-definitions/connectivity-insights.yaml' },
    { id: 'QualityOnDemand', repo: 'QualityOnDemand', path: 'code/api-definitions/qod-v0.8.0.yaml' },

    // == Device Information ==
    { id: 'DeviceIdentifier', repo: 'DeviceIdentifier', path: 'code/api-definitions/device-identifier.yaml' },
    { id: 'SimSwap', repo: 'SimSwap', path: 'code/api-definitions/sim-swap.yaml' },
    { id: 'DeviceRoamingStatus', repo: 'DeviceRoamingStatus', path: 'roaming-status.yaml' },
    { id: 'DeviceReachabilityStatus', repo: 'DeviceReachabilityStatus', path: 'device-reachability-status.yaml' },
    { id: 'ConnectedNetworkType', repo: 'ConnectedNetworkType', path: 'connected-network-type.yaml' },
];

module.exports = apiDefinitions;

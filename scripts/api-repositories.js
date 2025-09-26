// This manifest contains the definitive, audited list of all "Mature & Stable" CAMARA APIs.
// Each entry maps a unique ID to the repository and the exact file path within that repo.
// This is the source of truth for the merge script.
// Last validated: 2025-09-26

const apiDefinitions = [
    // == Authentication and Fraud Prevention ==
    { id: 'CustomerInsights', repo: 'CustomerInsights', path: 'dev/api-definitions/customer-insights-v0.2.0.yaml' },
    { id: 'DeviceSwap', repo: 'DeviceSwap', path: 'code/api-definitions/device-swap.yaml' },
    { id: 'KnowYourCustomerAgeVerification', repo: 'KnowYourCustomerAgeVerification', path: 'code/api-definitions/kyc-age-verification.yaml' },
    { id: 'KnowYourCustomerFillIn', repo: 'KnowYourCustomerFill-in', path: 'code/api-definitions/kyc-fill-in.yaml' },
    { id: 'KnowYourCustomerMatch', repo: 'KnowYourCustomerMatch', path: 'code/api-definitions/kyc-match.yaml' },
    { id: 'Tenure', repo: 'Tenure', path: 'code/api-definitions/kyc-tenure.yaml' },
    { id: 'NumberRecycling', repo: 'NumberRecycling', path: 'code/api-definitions/number-recycling.yaml' },
    { id: 'OtpValidation', repo: 'OTPValidation', path: 'code/api-definitions/one-time-password-sms.yaml' },
    { id: 'CallForwardingSignal', repo: 'CallForwardingSignal', path: 'code/api-definitions/call-forwarding-signal.yaml' },
    
    // == Location Services ==
    { id: 'Geofencing', repo: 'DeviceLocation', path: 'code/api-definitions/geofencing.yaml' },
    { id: 'LocationRetrieval', repo: 'DeviceLocation', path: 'code/api-definitions/location-retrieval.yaml' },
    { id: 'LocationVerification', repo: 'DeviceLocation', path: 'code/api-definitions/location-verification.yaml' },
    { id: 'PopulationDensity', repo: 'PopulationDensityData', path: 'code/api-definitions/population-density-data.yaml' },
    { id: 'RegionDeviceCount', repo: 'RegionDeviceCount', path: 'code/api-definitions/region-device-count.yaml' },

    // == Communication Services ==
    // Note: The WebRTC repo contains multiple files. 'webrtc-call-handling.yaml' is selected as the primary one.
    { id: 'WebRTC', repo: 'WebRTC', path: 'code/api-definitions/webrtc-call-handling.yaml' },

    // == Communication Quality ==
    { id: 'ConnectivityInsights', repo: 'ConnectivityInsights', path: 'code/api-definitions/connectivity-insights.yaml' },
    { id: 'QualityOnDemand', repo: 'QualityOnDemand', path: 'code/api-definitions/qod-v0.7.0.yaml' },
    
    // == Device Information ==
    { id: 'DeviceIdentifier', repo: 'DeviceIdentifier', path: 'code/api-definitions/device-identifier.yaml' },
    { id: 'SimSwap', repo: 'SimSwap', path: 'code/api-definitions/sim-swap.yaml' },
    // Note: The following APIs are in new, specific repositories after the DeviceStatus repo was split.
    { id: 'DeviceRoamingStatus', repo: 'DeviceRoamingStatus', path: 'roaming-status.yaml' },
    { id: 'DeviceReachabilityStatus', repo: 'DeviceReachabilityStatus', path: 'device-reachability-status.yaml' },
    { id: 'ConnectedNetworkType', repo: 'ConnectedNetworkType', path: 'connected-network-type.yaml' },
];

module.exports = apiDefinitions;

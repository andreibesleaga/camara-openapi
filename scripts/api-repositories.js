// This list has been manually audited and corrected against the live CAMARA GitHub structure.
// It removes private/obsolete repos and uses the new, specific repo names.
const apiRepositories = [
    // Authentication and Fraud Prevention
    'CustomerInsights',
    'DeviceSwap',
    'KnowYourCustomerAgeVerification',
    'KnowYourCustomerFill-in',
    'KnowYourCustomerMatch',
    'Tenure',
    'NumberRecycling',
    'OTPValidation',
    'CallForwardingSignal',

    // Location Services
    'DeviceLocation',
    'PopulationDensityData',
    'RegionDeviceCount',

    // Communication Services
    'WebRTC',

    // Communication Quality
    'ConnectivityInsights',
    'QualityOnDemand',

    // Device Information
    'DeviceIdentifier',
    'SimSwap',
    // The old 'DeviceStatus' is now broken into these specific repos:
    'DeviceRoamingStatus',
    'DeviceReachabilityStatus',
    'ConnectedNetworkType',
];

module.exports = apiRepositories;

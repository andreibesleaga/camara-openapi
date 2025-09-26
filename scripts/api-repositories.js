// This file contains the curated list of official CAMARA "Mature & Stable" API repositories.
// The main script will iterate over this list and dynamically find the latest
// OpenAPI specification file within each repository.

const apiRepositories = [
  // Authentication and Fraud Prevention
  "CustomerInsights",
  "DeviceSwap",
  "KnowYourCustomerAgeVerification",
  "KnowYourCustomerFill-in",
  "KnowYourCustomerMatch",
  "Tenure",
  "NumberRecycling",
  "OTPValidation",
  "CallForwardingSignal",

  // Location Services
  "DeviceLocation",
  "PopulationDensityData",
  "RegionDeviceCount",

  // Communication Services
  "WebRTC",

  // Communication Quality
  "ConnectivityInsights",
  "QualityOnDemand",

  // Device Information
  "DeviceIdentifier",
  "DeviceStatus",
  "SimSwap",

  // Computing Services
  "DeviceAppInstance",

  // Payments and Charging
  "Charging",
  "Payment",
];

module.exports = apiRepositories;

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- You should *NOT* be adding new change log entries to this file.
     You should create a file in the news directory instead.
     For helpful instructions, please see:
     https://6.docs.plone.org/volto/developer-guidelines/contributing.html#create-a-pull-request
-->

<!-- towncrier release notes start -->

## 2.1.0 (2025-03-30)

- Update CHANGELOG.md [fosten]
- Bump package.json versions to 2.1.0 [fosten]
- Bump Volto from 18.0.0-alpha.47 to 18.10.1 [fosten]
- Replace body-parser with express [fosten]
- Add log_category_selector [fosten]
- Catch connect error on initialization [fosten]
- Load APISchema once during middleware initialization [fosten]
- Add express.js middleware [fosten]
- corepack signature verfication workaround [fosten]
- Remove PlantAssets volto block [fosten]
- Remove PlantType volto block [fosten]
- Check if timestamp is defined [fosten]

## 2.0.0 (2024-10-28)

- Bump Volto from 18.0.0-alpha.46 to 18.0.0-alpha.47 [fosten]
- Update .eslintrc.js and storybook/main.js [fosten]
- Refactor using cookieplone [fosten]

## 1.2.0 (2024-10-26)

- Add CHANGELOG.md [fosten]
- Add customSettings.js [fosten]

## 1.1.0 (2024-06-27)

- Add multiple locations [fosten]
- Add land_type_selector [fosten]
- Export/import customizer, loginSchema, WholeDataResponse, WholePlantTypeResponse [fosten]
- Add default startdate if start_date_selector is null [fosten]
- Add start_date_selector and end_date_selector [fosten]
- Add sort_selector [fosten]
- Add status_selector [fosten]
- Add logchoices array [fosten]
- Move plant_type filter into farm.log.fetch filter [fosten]
- If both filters are unset, prompt user to set filter [fosten]
- Add PlantLogs block [fosten]
- Replace farm.remote.request with farm.asset.fetch [fosten]

## 1.0.0 (2024-06-06)

- Replace axiosClient.get with farm.remote.request [fosten]
- Store combodata IDs and URLs in arrays [fosten]
- Sort API requests by name [fosten]
- Retrieve paginated API data in Sidebar.jsx [fosten]
- Remove localStorage, filter on plant_type.id [fosten]
- Add taxonomy_term/plant_type API call to Sidebar.jsx [fosten]
- Retrieve paginated API data in View.jsx [fosten]
- Add customizer function, require lodash [fosten]
- Limit response2 response3 to data.attributes.name [fosten]

## 0.2.0 (2023-07-28)

- Create APIlogin [fosten]
- Add PlantType volto block [fosten]
- Call PlantAsset relationships links [fosten]
- Add README.md [fosten]
- Add farmOS.js dependency [fosten]
- Add PlantAssets block [fosten]

## 0.1.0 (2023-04-13)

- Initial commit [fosten]

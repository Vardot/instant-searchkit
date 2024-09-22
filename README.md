# InstantSearchKit

InstantSearchKit is an Elasticsearch site search application and UI component that leverages powerful search libraries to provide a seamless search experience. This project integrates three key libraries:

- **Searchkit**: An open-source library designed to help you build an exceptional search experience with Elasticsearch. It supports various frameworks, including React, Vue, and Angular.
- **Algolia InstantSearch.js with React**: An open-source UI library for React that enables the creation of sophisticated search interfaces in frontend applications, leveraging Algolia’s search technology.
- **Elasticsearch Server**: A Drupal module that acts as a proxy to the Elasticsearch server, facilitating secure and efficient search operations. For more details, refer to the [Search API ElasticsearchKit Proxy module](https://www.drupal.org/project/search_api_elasticsearchkit_proxy).

## Features

### Searchkit
- **Build Great Search Experiences**: Simplifies the creation of search interfaces by providing a range of UI components and integrations with Elasticsearch.
- **Framework Compatibility**: Works with various frontend frameworks including React, Vue, and Angular, making it adaptable to different project needs.

### Algolia InstantSearch.js with React
- **UI Component Library**: Offers a set of customizable UI components for React, allowing you to build powerful search interfaces quickly.
- **Real-time Search**: Supports real-time search and faceting, enhancing the user experience with instant search results.

### Elasticsearch Server
- **Search Proxy**: Acts as a proxy to the Elasticsearch server, ensuring secure and controlled access to search functionalities.
- **Integration with Drupal**: Provides a robust integration with Drupal for managing Elasticsearch connections and configurations.

## Getting Started

To get started with InstantSearchKit, follow these steps:

### Prerequisites
- Node.js and npm installed on your development machine.
- A Drupal site with the [Search API ElasticsearchKit Proxy module](https://www.drupal.org/project/search_api_elasticsearchkit_proxy) installed and configured.

### Installation

1. **Clone the Repository**

    ```bash
    git clone git@github.com:Vardot/instant-searchkit.git
    cd instant-searchkit
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure the Proxy**

    Ensure your Drupal site is configured with the Elasticsearch server proxy. You can find detailed instructions in the [Search API ElasticsearchKit Proxy documentation](https://www.drupal.org/project/search_api_elasticsearchkit_proxy).

4. **Update Environment Variables**

    Create a `.env` file in the root of your project and add the necessary environment variables to connect to your Drupal site and Elasticsearch server.

    ```env
    REACT_APP_ELASTICSEARCH_PROXY_URL=http://your-drupal-site.com/api/search
    ```

5. **Run the App**

    Start the development server to see your app in action.

    ```bash
    npm run start:searchkit_app
    ```

6. **Build the App for Production**

    When you’re ready to deploy, build the app using:

    ```bash
    npm run build:searchkit_app
    ```

## Usage

To use the search features, integrate the Searchkit and Algolia InstantSearch components into your React application. For detailed usage and examples, refer to the documentation for [Searchkit](https://github.com/searchkit/searchkit), [Algolia InstantSearch.js](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/react/), and the Elasticsearch Proxy.

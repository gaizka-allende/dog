<h1 align="center">Dog breeds</h1>

## Architecture 
A loosely coupled React architecture in which each component has little knowledge of the other components has been used to create this app. It’s an approach where which allows reusability of componetns as they are independent throughout the application. This approach focuses on code reusability, testability where components can be tested independently without much need integration testing and code collaboration where development can work independently to each other.

### PWA vs SSR
The app has been created as with NextJs, so SSR. This approach ensures a fast start of the app and any route changes in the browser does not need any subsequent page loads. SSO requests other that the root of the App (ie the secondary screen) can be property indexed.

### Directory structure
The directory structure follows the NextJs convetions. Tests can all located in the same file directory, however, as the application scales they can be moved to separate dirs. 

```
├── pages
│   └── index
│   └── breed
│       ├── [id].js 
```
Nested components should be used to avoid complexity. Also naming conventions should be clear and meaninful.

### State management
No components in the app hold state. A consistent global state (Redux). The Redux pattern is used to manage the application state. This is the Single Source of Truth pattern. As the app used server rendering, the state depends on the server or client side and it is reconciliated with the HYDRATE action.     

### UI 
The application UI is decomposed into presentation components. These presentation components represent what we see in the browser. 

### Data fetching
This is just a simple solution with doing fetch on the server side and injecting the data as props. A more real application could implement data fetching from a GraphQL server using Apollo client.

### Routing
Next js has been using for routing using the filesystem, which is a declarative way of routing as well as the components and it rates very well in accessibility.

### Styling
The styling and the code of the layout components are not separated. They are technically the same concern and can be are in the same file. This reduces complexity and specificity-related bugs. For this, the <a href="https://github.com/vercel/styled-jsx">styled-jsx</a> package is provides full CSS support in JSX as an style element. 

### Scalability
The loosely coupled approach is easily to maintain as the application grows. The application should be broken down into small, single-purpose components. This approach, the best starting point to build large-scale web applications.

### UI Library
Material UI could be used to create the UI elements; from Menus, Sidebars, to Buttons and Tooltips. 

### Localisation
If localisation is needed in the future, the library react-i18next should be installed as early as possible.

#### Common patterns and best practices
This app has been created using some of the most common React patterns such as Layout components, Container components, Higher-order components, State hoisting, Conditional rendering, etc ...

### Develpment
Run 'yarn dev' and browse localhost:3000

### Testing 
Run 'yarn test' for unit tests

### Deployment 
A Continuous Deployment release process should be used which would use automated testing to validate the codebase with autonomous deployments to a UAT and production environments connected to the development and release branches of a Git repository.


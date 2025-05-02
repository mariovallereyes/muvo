import { registerRootComponent } from 'expo';
import { AppRegistry, Text } from 'react-native';

// Create a component using the createElement API instead of JSX
// This avoids any potential JSX transformation issues
const MinimalApp = () => {
  return Text.render('Hello World');
};

// Register using both methods to be safe
registerRootComponent(MinimalApp);
AppRegistry.registerComponent('main', () => MinimalApp);

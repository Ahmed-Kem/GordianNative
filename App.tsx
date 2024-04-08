import { NavigationContainer } from '@react-navigation/native';

import AuthNav from './src/navigation/AuthNav';

export default function App() {
  return (
    <NavigationContainer>
      <AuthNav />
    </NavigationContainer>
  );
}

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                header: null,
            }
        }
    }, {
        defaultNavigationOptions: {
            headerBackTitleVisible: false
        }
    })
);

export default Routes;
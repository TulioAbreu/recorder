import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Record from './pages/Record';

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            screen: Main,
            navigationOptions: {
                headerShown: false,
            }
        },
        Record: {
            screen: Record,
            navigationOptions: {
                headerShown: false,
            }
        }
    }, {
        defaultNavigationOptions: {
            headerBackTitleVisible: false
        }
    })
);

export default Routes;
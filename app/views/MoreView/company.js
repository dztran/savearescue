import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Switch
} from 'react-native';
import Icon from '../../components/Icon';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LabelIconText from '../../components/IconText/LabelIconText';
import styles, { colors, INPUT_HEIGHT, PHONE_NUMBER } from './styles';
import { sendEmail, getDirection, web, phoneCall } from '../../api/communications';

export default class CompanyView extends Component {
    static navigationOptions = {
        header: null,
        drawerLabel: 'Company Information',
        drawerIcon: (<Ionicons name="information-circle" size={24} color={colors.primary} />)
    };

    cancel = () => {
        this.props.navigation.goBack();
    }

    linkEmail = () => {
        let addr = "Success@SaveARescue.org";
        sendEmail(addr.split(), undefined, undefined, "Request for more information", "I would like more information about your organization.");
    }

    linkPhone = () => {
        phoneCall(PHONE_NUMBER, true);
    }

    render() {
        return (
            <View style={styles.mainContainer__noNav}>
                <View style={styles.topBar}>
                    <Icon iconStyle={{margin:10}} name='close' type='iconicon' activeOpacity={0.4} underlayColor='transparent'
                        onPress={this.cancel} size={30} color={colors.primary} />
                </View>
                <ScrollView contentContainerStyle={styles.scrollWrapper}>
                    <Text style={styles.title}>About</Text>
                    <View style={styles.line}/>
                    <Text style={styles.blockText}>{`SaveARescue is an Active 501 [c] 3 Non-Profit Organization, and all donations are tax deductible.

Operated with passion every day by approachable, unpaid, experienced pet experts and volunteers.

We are the only “All-In-One” Search Directory & Central Registry representing more than 19,000+ Dog & Cat Rescues & Shelters and all their adoptables; listing all Animal Control Centers; 24/7 Emergency Vet Clinics all Low Cost Spay & Neuter Clinics and more Pet Services in 18 categories.

We offer the only Toll Free 24/7 “Hotline” for any pet caring person seeking help and aid for any Dog or Cat in a life-threatening emergency.  Ensuring the a longer, healthier life for your pet with this APP: `}<Text style={{color: 'blue'}} onPress={() => { this.linkPhone(); }}
>{`888.440.6467`}</Text>{`.`}</Text>
                    <View style={styles.space}/>
                    <Text style={styles.title}>Contact Information</Text>
                    <View style={styles.line}/>
                    <LabelIconText style={styles.picker} onPress={() => { this.linkEmail(); }}
                        title="Success@SaveARescue.org" icon="mail"/>
                    <LabelIconText style={styles.picker} onPress={() => { getDirection(0, 0, 34.152081, -118.827165) }}
                        title={`Save A Rescue, Inc.\n1014 S. Westlake Blvd., Ste. 14-193,\nWestlake Village, CA, 91361`} icon="map"/>
                    <View style={styles.space}/>
                    <Text style={styles.title}>Our Partners</Text>
                    <View style={styles.line}/>
                    <LabelIconText style={styles.picker} onPress={() => { web("http://www.redcross.org/"); }}
                        title="The American Red Cross" icon="browser"/>
                    <LabelIconText style={styles.picker} onPress={() => { web("http://www.maddiesfund.org/index.htm"); }}
                        title="Maddie’s Fund" icon="browser"/>
                    <LabelIconText style={styles.picker} onPress={() => { web("http://www.humanesociety.org/"); }}
                        title="HSUS [The Humane Society of the US]" icon="browser"/>
                    <LabelIconText style={styles.picker} onPress={() => { web("https://www.pilotsnpaws.org/"); }}
                        title="Pilots n' Paws" icon="browser"/>
                    <Text style={styles.label}>{`19,000 Dog & Cat Rescues & Shelters Nationwide & Canada`}</Text>
                </ScrollView>
            </View>
        );
    }
}

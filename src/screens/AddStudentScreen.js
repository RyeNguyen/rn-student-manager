import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

import Button from '../components/Button.component';
import InputField from '../components/InputField.component';
import {ScrollView} from 'react-native-gesture-handler';

const AvatarList = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1668638674403-5b750a0dba0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1667747755652-0716ae70c386?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=756&q=80',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  },
];

const AddStudentScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(18);
  const [currentAvatar, setCurrentAvatar] = useState(1);
  const [errMsg, setErrMsg] = useState('');

  const validateEmpty = () => {
    if (!name || !email || !age) {
      setErrMsg('Please fill out all the fields.');
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setErrMsg('Email format is not correct! Please check again.');
      return false;
    }
    return true;
  };

  const validateAge = () => {
    if (age <= 0 || age >= 100) {
      setErrMsg('Age must be between 0 and 100.');
      return false;
    }
    return true;
  };

  const submitForm = () => {
    if (validateEmpty() && validateEmail() && validateAge()) {
      setErrMsg('Create Success!!');
    }
  };

  return (
    <View style={LayoutStyles.layoutScreen}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Button text="Go Back" handlePress={() => navigation.goBack()} />
      </View>

      <ScrollView>
        <Text style={[TextStyles.h2, styles.heading]}>Add New Student</Text>

        <InputField
          label="Student's Name"
          placeholder="John Doe"
          value={name}
          handleChange={newName => setName(newName)}
        />
        <InputField
          label="Student's Email"
          placeholder="Johndoe98@gmail.com"
          value={email}
          handleChange={newEmail => setEmail(newEmail)}
        />
        <InputField
          label="Student's Age"
          keyboardType="numeric"
          value={age}
          handleChange={newAge => setAge(newAge)}
        />

        <View style={styles.section}>
          <Text style={[TextStyles.textMain, styles.avatarText]}>
            Please Choose Avatar
          </Text>
          <View style={LayoutStyles.layoutStretch}>
            {AvatarList.map(avatar => (
              <TouchableOpacity
                key={avatar.id}
                onPress={() => setCurrentAvatar(avatar.id)}
                style={[
                  styles.avatar,
                  currentAvatar === avatar.id ? styles.avatarActive : null,
                  {
                    marginRight:
                      avatar.id === AvatarList.length ? 0 : Sizes.medium,
                  },
                ]}>
                <Image style={styles.avatarImage} source={{uri: avatar.url}} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[TextStyles.textMain, styles.avatarText]}>
            Please Pick Some Subjects
          </Text>
          <View style={[styles.buttonGroup, LayoutStyles.layoutStretch]}>
            <Button text="Registered" />
            <Button text="Unregistered" />
          </View>
        </View>

        {errMsg ? <Text style={TextStyles.h4}>{errMsg}</Text> : null}
        <View style={styles.footer}>
          <Button text="Add Student" handlePress={submitForm} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: Sizes.hugerH,
    paddingBottom: Sizes.massiveH,
    paddingHorizontal: Sizes.huge,
  },
  heading: {
    textAlign: 'center',
    marginBottom: Sizes.massiveH,
  },
  section: {
    marginHorizontal: Sizes.huge,
    marginBottom: Sizes.massiveH,
  },
  avatarText: {
    marginBottom: Sizes.mediumH,
  },
  avatar: {
    flex: 1,
    borderRadius: Sizes.mediumLarge,
    borderWidth: 2,
    borderColor: 'transparent',
    opacity: 0.3,
  },
  avatarImage: {
    height: Sizes.massive * 2,
    borderRadius: Sizes.mediumLarge - 1,
  },
  avatarActive: {
    borderStyle: 'dashed',
    borderColor: Colors.tertiary,
    opacity: 1,
  },
  buttonGroup: {},
  footer: {
    marginHorizontal: Sizes.huge,
    marginTop: Sizes.hugeH,
    marginBottom: Sizes.massiveH,
  },
});

export default AddStudentScreen;

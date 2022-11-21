import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

import {useAppSelector, useAppDispatch} from '../app/hooks';
import {
  fetchAllSubjects,
  pickSubject,
  removeSubject,
  fetchSubjectsForStudent,
  resetSubjects,
} from '../features/student/subjectSlice';
import {addStudent, updateStudent} from '../features/student/studentSlice';

import Button from '../components/Button.component';
import InputField from '../components/InputField.component';
import SubjectCard from '../components/SubjectCard.component';

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

const StudentFormScreen = ({navigation, route}) => {
  const {data} = route.params;
  const [name, setName] = useState(data ? data.name : '');
  const [email, setEmail] = useState(data ? data.email : '');
  const [age, setAge] = useState(data ? data.age.toString() : '18');
  const [currentAvatar, setCurrentAvatar] = useState(1);
  const [errMsg, setErrMsg] = useState('');
  const [selectedTab, setSelectedTab] = useState('reg');

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchAllSubjects());
      return () => resetFields();
    }, [dispatch]),
  );

  const dispatch = useAppDispatch();
  const registeredSubjects = useAppSelector(
    state => state.subject.registeredSubjects,
  );
  const unregisteredSubjects = useAppSelector(
    state => state.subject.unregisteredSubjects,
  );

  /**
   * Filter all subjects to get registered subjects for student
   * Author: MinhNQ53 (21/11/2022)
   */
  useEffect(() => {
    if (data) {
      dispatch(fetchSubjectsForStudent(data.subjects));
      mapAvatar();
    }
  }, [data, dispatch]);

  const resetFields = () => {
    setErrMsg('');
    setAge('0');
    setName('');
    setEmail('');
    setCurrentAvatar(1);
    setSelectedTab('reg');
    dispatch(resetSubjects());
  };

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

  const validateSubject = () => {
    if (registeredSubjects.length === 0) {
      setErrMsg('You must choose at least ONE subject.');
      return false;
    }
    return true;
  };

  const submitForm = () => {
    if (
      validateEmpty() &&
      validateEmail() &&
      validateAge() &&
      validateSubject()
    ) {
      if (!data) {
        const newStudent = {
          createdAt: new Date(),
          name: name,
          email: email,
          age: parseInt(age, 10),
          avatar: mapAvatar(),
          subjects: registeredSubjects,
        };
        dispatch(addStudent(newStudent));
      } else {
        dispatch(
          updateStudent({
            id: data.id,
            name: name,
            email: email,
            age: parseInt(age, 10),
            avatar: mapAvatar(),
            subjects: registeredSubjects,
          }),
        );
      }
      navigation.navigate('StudentList');
    }
  };

  const mapAvatar = () => {
    for (let i = 0; i < AvatarList.length; i++) {
      if (!data && AvatarList[i].id === currentAvatar) {
        return AvatarList[i].url;
      } else if (data && AvatarList[i].url === data.avatar) {
        setCurrentAvatar(AvatarList[i].id);
      }
    }
  };

  const renderCard = (item, location) => {
    return (
      <SubjectCard
        key={item.id}
        data={item}
        handlePress={() =>
          location === 'reg'
            ? dispatch(removeSubject(item))
            : dispatch(pickSubject(item))
        }
      />
    );
  };

  return (
    <View style={LayoutStyles.layoutScreen}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Button text="Go Back" handlePress={() => navigation.goBack()} />
      </View>

      <ScrollView>
        <Text style={[TextStyles.h2, styles.heading]}>
          {data ? 'Update Student' : 'Add New Student'}
        </Text>

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
            Please pick some subjects by tapping on the Subject card (you must
            choose at least ONE to proceed)
          </Text>
          <View style={LayoutStyles.layoutStretch}>
            <View style={styles.buttonWrapper}>
              <Button
                text={`Registered (${registeredSubjects.length})`}
                isPrimary={selectedTab === 'reg'}
                handlePress={() => setSelectedTab('reg')}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                text={`Unregister (${unregisteredSubjects.length})`}
                isPrimary={selectedTab === 'unreg'}
                handlePress={() => setSelectedTab('unreg')}
              />
            </View>
          </View>

          <SafeAreaView style={styles.subjectList}>
            {selectedTab === 'reg'
              ? registeredSubjects.map(sub => renderCard(sub, 'reg'))
              : unregisteredSubjects.map(sub => renderCard(sub, 'unreg'))}
          </SafeAreaView>
        </View>

        {errMsg ? <Text style={TextStyles.h4}>{errMsg}</Text> : null}
        <View style={styles.footer}>
          <Button
            text={data ? 'Update Student' : 'Add Student'}
            handlePress={submitForm}
          />
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
    lineHeight: 22,
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
  buttonWrapper: {
    flex: 1,
  },
  subjectList: {
    marginTop: Sizes.hugerH,
    marginHorizontal: -Sizes.huge,
    // height: scaleSizeUI(500, true),
    flex: 1,
  },
  footer: {
    marginHorizontal: Sizes.huge,
    marginTop: Sizes.hugeH,
    marginBottom: Sizes.massiveH,
  },
});

export default StudentFormScreen;

import React, {useState} from 'react';
import {ScrollView, Text, View, StyleSheet} from 'react-native';

import {useAppSelector, useAppDispatch} from '../app/hooks';
import {addNewSubject} from '../features/student/subjectSlice';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

import Button from '../components/Button.component';
import InputField from '../components/InputField.component';

const SubjectFormScreen = ({navigation, route}) => {
  const {data} = route.params;
  const dispatch = useAppDispatch();
  const [name, setName] = useState(data ? data.name : '');
  const [classroom, setClassroom] = useState(data ? data.classroom : '');
  const [teacher, setTeacher] = useState(data ? data.teacher : '');
  const [students, setStudents] = useState(data ? data.students : []);
  const [errMsg, setErrMsg] = useState('');

  const validateEmpty = () => {
    if (!name || !classroom || !teacher) {
      setErrMsg('Please fill out all the fields.');
      return false;
    }
    return true;
  };

  const submitForm = () => {
    if (validateEmpty()) {
      if (!data) {
        const newSubject = {
          createdAt: new Date(),
          name: name,
          classroom: classroom,
          teacher: teacher,
          students: students,
        };
        dispatch(addNewSubject(newSubject));
        navigation.navigate('SubjectList');
      }
    }
  };

  return (
    <View style={LayoutStyles.layoutScreen}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Button text="Go Back" handlePress={() => navigation.goBack()} />
      </View>

      <ScrollView>
        <Text style={[TextStyles.h2, styles.heading]}>
          {data ? 'Update Subject' : 'Add New Subject'}
        </Text>

        <InputField
          label="Subject's Name"
          placeholder="React Native Development"
          value={name}
          maxLength={50}
          handleChange={newName => setName(newName)}
        />
        <InputField
          label="Subject's Classroom"
          placeholder="FA.HN.02"
          value={classroom}
          maxLength={10}
          handleChange={newClassroom => setClassroom(newClassroom)}
        />
        <InputField
          label="Subject's Teacher"
          placeholder="John Doe"
          value={teacher}
          maxLength={50}
          handleChange={newTeacher => setTeacher(newTeacher)}
        />

        {errMsg ? <Text style={TextStyles.h4}>{errMsg}</Text> : null}
        <View style={styles.footer}>
          <Button
            text={data ? 'Update Subject' : 'Add Subject'}
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
  footer: {
    marginHorizontal: Sizes.huge,
    marginTop: Sizes.hugeH,
    marginBottom: Sizes.massiveH,
  },
});

export default SubjectFormScreen;

import React, {useEffect} from 'react';
import {FlatList, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {fetchPaginatedStudents} from '../features/student/studentSlice';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

import StudentCard from '../components/StudentCard.component';

const StudentListScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(state => state.student.currentPage);
  const currentLimit = useAppSelector(state => state.student.currentLimit);
  const students = useAppSelector(state => state.student.students);

  useEffect(() => {
    dispatch(fetchPaginatedStudents({currentPage, currentLimit}));
  }, [currentLimit, currentPage, dispatch]);

  const renderCard = ({item}) => {
    return <StudentCard data={item} />;
  };

  return (
    <View style={LayoutStyles.layoutScreen}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h2}>All Students</Text>

        <TouchableOpacity
          style={[styles.button, LayoutStyles.layoutCenter]}
          onPress={() => navigation.navigate('AddStudent')}>
          <Text style={[TextStyles.textMain, TextStyles.textDark]}>
            Add Student
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        keyExtractor={student => student.id}
        renderItem={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: Sizes.hugerH,
    paddingHorizontal: Sizes.huge,
  },
  button: {
    paddingVertical: Sizes.smallerH,
    paddingHorizontal: Sizes.medium,
    borderRadius: Sizes.mediumLarge,
    backgroundColor: Colors.tertiary,
  },
});

export default StudentListScreen;

import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {useAppSelector, useAppDispatch} from '../app/hooks';
import {fetchAllSubjects} from '../features/student/subjectSlice';

import Sizes from '../constants/Sizes.constant';
import Colors from '../constants/Colors.constant';
import LayoutStyles from '../styles/Layout.style';
import TextStyles from '../styles/Text.style';

import SubjectCard from '../components/SubjectCard.component';
import Button from '../components/Button.component';

const SubjectListScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const subjects = useAppSelector(state => state.subject.subjects);
  const isRefreshing = useAppSelector(state => state.subject.isRefreshing);

  useEffect(() => {
    dispatch(fetchAllSubjects());
  }, [dispatch]);

  const renderCard = ({item}) => {
    return (
      <SubjectCard
        key={item.id}
        data={item}
        handlePress={() => navigation.navigate('AddSubject', {data: item})}
      />
    );
  };

  const refreshList = () => {
    dispatch(fetchAllSubjects());
  };

  return (
    <View style={LayoutStyles.layoutScreen}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h2}>All Subjects</Text>

        <Button
          text="Add Subject"
          handlePress={() => navigation.navigate('AddSubject', {data: null})}
        />
      </View>

      <FlatList
        data={subjects}
        keyExtractor={student => student.id}
        renderItem={renderCard}
        removeClippedSubviews
        progressViewOffset={10}
        onRefresh={refreshList}
        refreshing={isRefreshing}
        onStartReachedThreshold={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: Sizes.hugerH,
    paddingHorizontal: Sizes.huge,
  },
  loader: {
    width: '100%',
    marginBottom: Sizes.mediumLarge,
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
  loaderInner: {
    backgroundColor: Colors.tertiary,
    padding: Sizes.small,
    borderRadius: 1000,
  },
});

export default SubjectListScreen;

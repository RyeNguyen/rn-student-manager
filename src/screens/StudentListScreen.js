import React, {useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {useAppDispatch, useAppSelector} from '../app/hooks';
import {
  fetchPaginatedStudents,
  changePage,
  refresh,
} from '../features/student/studentSlice';

import Colors from '../constants/Colors.constant';
import Sizes from '../constants/Sizes.constant';
import TextStyles from '../styles/Text.style';
import LayoutStyles from '../styles/Layout.style';

import StudentCard from '../components/StudentCard.component';
import Button from '../components/Button.component';

const StudentListScreen = ({navigation}) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(state => state.student.currentPage);
  const currentLimit = useAppSelector(state => state.student.currentLimit);
  const isLoading = useAppSelector(state => state.student.isLoading);
  const isRefreshing = useAppSelector(state => state.student.isRefreshing);
  const students = useAppSelector(state => state.student.students);

  useEffect(() => {
    dispatch(fetchPaginatedStudents({currentPage, currentLimit}));
  }, [currentLimit, currentPage, dispatch]);

  const renderCard = ({item}) => {
    return (
      <StudentCard
        data={item}
        handlePress={() => navigation.navigate('AddStudent', {data: item})}
      />
    );
  };

  const renderMore = () => {
    dispatch(changePage());
  };

  const refreshList = () => {
    dispatch(refresh());
    dispatch(fetchPaginatedStudents({currentPage: 1, currentLimit}));
  };

  return (
    <View style={LayoutStyles.layoutScreen}>
      <View style={[LayoutStyles.layoutStretch, styles.header]}>
        <Text style={TextStyles.h2}>All Students</Text>

        <Button
          text="Add Student"
          handlePress={() => navigation.navigate('AddStudent', {data: null})}
        />
      </View>

      <FlatList
        data={students}
        keyExtractor={student => student.id}
        renderItem={renderCard}
        removeClippedSubviews
        progressViewOffset={10}
        onRefresh={refreshList}
        refreshing={isRefreshing}
        onStartReachedThreshold={2}
        onEndReachedThreshold={0.5}
        onEndReached={renderMore}
      />

      {isLoading ? (
        <View
          style={[
            LayoutStyles.layoutShadow,
            LayoutStyles.layoutCenter,
            styles.loader,
          ]}>
          <ActivityIndicator
            size="large"
            color={Colors.primary}
            style={styles.loaderInner}
          />
        </View>
      ) : null}
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

export default StudentListScreen;

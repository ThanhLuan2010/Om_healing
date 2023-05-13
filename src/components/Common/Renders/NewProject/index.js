/* eslint-disable react-hooks/exhaustive-deps */
import {useGetNewProjectsQuery} from '@api/dashboard';
import {Block} from '@components';
import {NewProjectItem} from '@components/Common/Items';
import {routes} from '@navigation/routes';
import {handleScrollPosition} from '@utils/handleScroll';
import {HOME_KEYWORD, PAGE_DEFAULT} from '@utils/mockData';
import {width} from '@utils/responsive';
import React, {useMemo, useRef} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const NewProject = ({scrollViewRef, navigation, isTitle, style}) => {
  const newProjectRef = useRef(null);
  const {data: newProjectsData = []} = useGetNewProjectsQuery({
    page: PAGE_DEFAULT,
  });

  const onSeeAllNewProject = () => {
    // Link to See All New Project
    navigation.navigate(routes.NEW_PROJECT_SEE_ALL_SCREEN);
  };

  console.log({newProjectsData});

  const renderItem = useMemo(() => {
    return (
      <Block marginBottom={16} style={style}>
        {isTitle && (
          <Block
            row
            alignCenter
            space={'between'}
            marginBottom={16}
            paddingHorizontal={16}>
            <Text style={styles.textTitle}>{HOME_KEYWORD.NewProjects}</Text>

            {newProjectsData?.list?.last_page > PAGE_DEFAULT && (
              <TouchableOpacity onPress={onSeeAllNewProject}>
                <Text style={[styles.textSeeAll]}>
                  {HOME_KEYWORD.ViewToAll}
                </Text>
              </TouchableOpacity>
            )}
          </Block>
        )}

        <FlatList
          ref={newProjectRef}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={newProjectsData?.list?.data}
          onScroll={event => {
            handleScrollPosition(event);
          }}
          snapToInterval={width}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => item?.project_id + index.toString()}
          renderItem={({item, index}) => {
            return (
              <NewProjectItem
                data={newProjectsData?.list?.data}
                item={item}
                index={index}
                lastIndex={newProjectsData.list?.data.length - 1 === index}
                newProjectRef={newProjectRef}
                scrollViewRef={scrollViewRef}
              />
            );
          }}
        />
      </Block>
    );
  }, [newProjectsData, newProjectRef]);

  return <>{newProjectsData?.list?.data?.length > 0 && renderItem}</>;
};

export default NewProject;

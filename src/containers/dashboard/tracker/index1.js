import Header from 'components/common/header';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from '../../../constants';
import {AddComunityModal} from './addCommunityModal';
import {AddEmploymentModal} from './addEmploymentModal';

export const Tracker = props => {
  const {componentId} = props;
  const [soberaity, setSoberaity] = useState(false);
  const [employment, setEmployment] = useState(false);
  const [community, setCommunity] = useState(false);
  const [filterType, setFilterType] = useState(0); //0 for Mood, 1 for Task, 2 for All
  const [filterDuration, setFilterDuration] = useState(0); //0 for 1m, 1 for 3m, 2 for 6m, 3 for 1y, 4 for All
  const [mood, setmood] = useState(10); //0 for 1m, 1 for 3m, 2 for 6m, 3 for 1y, 4 for All
  const [soberityEdit, setSoberityEdit] = useState(false);
  const [employmentEdit, setEmploymentEdit] = useState(false);
  const [addEmploymentModal, setAddEmploymentModal] = useState(false);
  const [addSoberityModal, setAddSoberityModal] = useState(false);
  const [addCommunityModal, setAddCommunityModal] = useState(false);
  const [ampm, setampm] = useState(true);

  useEffect(() => {}, []);

  const myMood = value => {
    setFilterType(value);
  };
  const selectfilterDuration = value => {
    setFilterDuration(value);
  };
  const deleteSoberityData = data => {};
  const deleteEmploymentData = data => {};

  const FilterTypes = values => {
    return (
      <TouchableOpacity
        onPress={() => {
          selectfilterDuration(values.filterType);
        }}
        style={{
          height: RFValue(30),
          width: RFValue(50),
          borderRadius: RFValue(10),
          backgroundColor:
            filterDuration == values.filterType ? '#308D85' : 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: RFValue(16),
            color: filterDuration == values.filterType ? 'white' : '#808080',
            fontWeight: 'bold',
          }}>
          {values.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const GraphTypes = values => {
    return (
      <TouchableOpacity
        onPress={() => {
          myMood(values.filterType);
        }}
        style={{
          height: RFValue(30),
          width: RFValue(80),
          borderRadius: RFValue(10),
          backgroundColor:
            filterType == values.filterType ? '#308D85' : 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: RFValue(16),
            color: filterType == values.filterType ? 'white' : '#808080',
            fontWeight: 'bold',
          }}>
          {values.title}
        </Text>
      </TouchableOpacity>
    );
  };
  const ActivityGraph = () => {
    return (
      <View
        style={{
          height: RFValue(312),
          width: '99%',
          backgroundColor: 'white',
          borderRadius: RFValue(5),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          alignSelf: 'center',
        }}>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RFValue(5),
          }}>
          <GraphTypes title={'Mood'} filterType={0} />
          <GraphTypes title={'Task'} filterType={1} />
          <GraphTypes title={'All'} filterType={2} />
        </View>
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <LineChart
            data={{
              labels: ['1', '1W', '1M', '3M', '6M', '1Y'],
              datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                  ],
                },
              ],
            }}
            width={RFPercentage(65)}
            height={220}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `#707070`,
              labelColor: (opacity = 1) => `black`,
            }}
            withInnerLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            style={{}}
          />
        </View>
        <View
          style={{
            flex: 0.15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: RFValue(5),
          }}>
          <FilterTypes title={'1m'} filterType={0} />
          <FilterTypes title={'3m'} filterType={1} />
          <FilterTypes title={'6m'} filterType={2} />
          <FilterTypes title={'1y'} filterType={3} />
          <FilterTypes title={'All'} filterType={4} />
        </View>
      </View>
    );
  };

  const MoodMeter = () => {
    return (
      <View
        style={{
          height: RFValue(280),
          // backgroundColor: 'white',
          borderRadius: RFValue(10),
        }}>
        <View
          style={{
            flex: 0.2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: '#808080',
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Okay
          </Text>
        </View>
        <View
          style={{flex: 0.6, justifyContent: 'center', alignItems: 'center'}}>
          <AnimatedCircularProgress
            prefill={80}
            size={180}
            width={15}
            fill={80}
            tintColor="#4B8782"
            arcSweepAngle={180}
            rotation={-90}
            lineCap={'round'}
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#00000017">
            {fill => (
              <>
                <Text
                  style={{
                    fontSize: RFValue(16),
                    color: '#808080',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  Mood
                </Text>
              </>
            )}
          </AnimatedCircularProgress>
        </View>
        <View style={{flex: 0.2}}>
          <View
            style={{
              height: RFValue(52),
              width: '90%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#308D85',
              borderRadius: RFValue(10),
            }}>
            <Text
              style={{
                fontSize: RFValue(16),
                color: 'white',
                fontWeight: 'bold',
                paddingVertical: RFValue(20),
              }}>
              Set Mood{' '}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const Titles = value => {
    return (
      <Text
        style={{
          fontSize: RFValue(16),
          color: '#808080',
          fontWeight: 'bold',
          paddingVertical: RFValue(20),
        }}>
        {value.title}
      </Text>
    );
  };

  const Soberity = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setSoberaity(!soberaity);
          }}
          style={{
            height: RFValue(52),
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: soberaity ? '#BBD6D4' : '#308D85',
            borderRadius: RFValue(10),
            flexDirection: 'row',
            paddingHorizontal: RFValue(15),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: 'white',
              fontWeight: 'bold',
              paddingVertical: RFValue(20),
            }}>
            Soberity{' '}
          </Text>
          {/* <Icon name="chevron-right" size={20} color="white" /> */}
        </TouchableOpacity>
        {soberaity && (
          <View
            style={{
              width: '99%',
              backgroundColor: 'white',
              borderRadius: RFValue(10),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: RFValue(50),
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: RFValue(20),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.9,
                }}
                onPress={() => {
                  setSoberityEdit(!soberityEdit);
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: soberityEdit
                      ? '#308D85'
                      : Constants.Colors.SUB_HEADING,
                    fontWeight: 'bold',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  alignItems: 'flex-end',
                }}
                onPress={() => {
                  setAddEmploymentModal(true);
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: soberityEdit
                      ? '#308D85'
                      : Constants.Colors.SUB_HEADING,
                    fontWeight: 'bold',
                    paddingLeft: soberityEdit ? RFValue(10) : 0,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                {id: 1001, title: '1 Day', value: true},
                {id: 1002, title: '3 Days', value: true},
                {id: 1003, title: '7 Days', value: false},
                {id: 1004, title: '10 Days', value: false},
                {id: 1005, title: '2 Weeks', value: false},
              ]}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: RFValue(50),
                      flexDirection: 'row',
                      paddingHorizontal: RFValue(20),
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.85}}>
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          color: Constants.Colors.SUB_HEADING,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.15,
                        flexDirection: 'row',
                        justifyContent: soberityEdit
                          ? 'space-between'
                          : 'flex-end',
                      }}>
                      {/* {item.value ? (
                        <Icon name="circle" size={15} color="#308D85" />
                      ) : (
                        <Icon name="circle" size={15} color="#D8D8D8" />
                      )} */}
                      {soberityEdit && (
                        <TouchableOpacity
                          onPress={() => {
                            deleteSoberityData(item);
                          }}>
                          {/* <Icon name="minus-circle" size={15} color="red" /> */}
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </>
    );
  };

  const Employment = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setEmployment(!employment);
          }}
          style={{
            height: RFValue(52),
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: employment ? '#BBD6D4' : '#308D85',
            borderRadius: RFValue(10),
            flexDirection: 'row',
            paddingHorizontal: RFValue(15),
            marginTop: RFValue(10),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: 'white',
              fontWeight: 'bold',
              paddingVertical: RFValue(20),
            }}>
            Employment{' '}
          </Text>
          {/* <Icon name="chevron-right" size={20} color="white" /> */}
        </TouchableOpacity>
        {employment && (
          <View
            style={{
              height: RFValue(280),
              width: '99%',
              backgroundColor: 'white',
              borderRadius: RFValue(10),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,
              alignSelf: 'center',
            }}>
            <View
              style={{
                height: RFValue(50),
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: RFValue(20),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{flex: 0.9}}
                onPress={() => {
                  setEmploymentEdit(!employmentEdit);
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: employmentEdit
                      ? '#308D85'
                      : Constants.Colors.SUB_HEADING,
                    fontWeight: 'bold',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 0.1, alignItems: 'flex-end'}}
                onPress={() => {
                  setAddEmploymentModal(true);
                }}>
                <Text
                  style={{
                    fontSize: RFValue(14),
                    color: employmentEdit
                      ? '#308D85'
                      : Constants.Colors.SUB_HEADING,
                    fontWeight: 'bold',
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={[
                {id: 1001, title: 'Write resume', value: '08/08/2020'},
                {id: 1002, title: 'Review resume', value: '08/08/2020'},
                {id: 1003, title: 'Search jobs', value: 'Daily'},
                {id: 1004, title: 'Go to interview', value: '-'},
              ]}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={{
                      height: RFValue(50),
                      flexDirection: 'row',
                      paddingHorizontal: RFValue(20),
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 0.65}}>
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          color: Constants.Colors.SUB_HEADING,
                          fontWeight: 'bold',
                        }}>
                        {item.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 0.35,
                        flexDirection: 'row',
                        justifyContent: employmentEdit
                          ? 'space-between'
                          : 'flex-end',
                      }}>
                      <Text
                        style={{
                          fontSize: RFValue(14),
                          color: Constants.Colors.SUB_HEADING,
                          fontWeight: 'bold',
                        }}>
                        {item.value}
                      </Text>
                      {employmentEdit && (
                        <TouchableOpacity
                          onPress={() => {
                            deleteEmploymentData(item);
                          }}>
                          {/* <Icon name="minus-circle" size={15} color="red" /> */}
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>

                  // <TouchableOpacity
                  //   style={{
                  //     height: RFValue(50),
                  //     flexDirection: 'row',
                  //     justifyContent: 'space-between',
                  //     paddingHorizontal: RFValue(20),
                  //     alignItems: 'center',
                  //   }}>
                  //   <Text
                  //     style={{
                  //       fontSize: RFValue(14),
                  //       color: Constants.Colors.SUB_HEADING,
                  //       fontWeight: 'bold',
                  //     }}>
                  //     {item.title}
                  //   </Text>
                  //   <Text
                  //     style={{
                  //       fontSize: RFValue(14),
                  //       color: Constants.Colors.SUB_HEADING,
                  //       fontWeight: 'bold',
                  //     }}>
                  //     {item.value}
                  //   </Text>
                  // </TouchableOpacity>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        )}
      </>
    );
  };

  const Community = () => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            setCommunity(!community);
          }}
          style={{
            height: RFValue(52),
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: community ? '#BBD6D4' : '#308D85',
            borderRadius: RFValue(10),
            flexDirection: 'row',
            paddingHorizontal: RFValue(15),
            marginTop: RFValue(10),
          }}>
          <Text
            style={{
              fontSize: RFValue(16),
              color: 'white',
              fontWeight: 'bold',
              paddingVertical: RFValue(20),
            }}>
            Community{' '}
          </Text>
          {/* <Icon name="chevron-right" size={20} color="white" /> */}
        </TouchableOpacity>
        {community && (
          <View
            style={{
              width: '99%',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderRadius: RFValue(10),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,

              elevation: 4,

              paddingHorizontal: RFValue(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                setAddCommunityModal(true);
              }}
              style={{
                height: RFValue(40),
                width: RFValue(100),
                borderRadius: RFValue(10),
                justifyContent: 'center',
                paddingHorizontal: RFValue(20),
                backgroundColor: '#308D85',
                alignItems: 'center',
                alignSelf: 'flex-end',
                marginVertical: RFValue(10),
              }}>
              <Text
                style={{
                  fontSize: RFValue(14),
                  color: 'white',
                  fontWeight: 'bold',
                }}>
                Add
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const SoberTracker = () => {
    return (
      <View
        style={{
          height: RFValue(280),
          width: '100%',
          borderRadius: RFValue(10),
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: RFValue(20),
        }}>
        <AnimatedCircularProgress
          prefill={80}
          size={180}
          width={15}
          fill={80}
          tintColor="#4B8782"
          lineCap={'round'}
          onAnimationComplete={() => console.log('onAnimationComplete')}
          backgroundColor="#00000017">
          {fill => (
            <>
              <Text
                style={{
                  fontSize: RFValue(16),
                  color: '#808080',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                Three{'\n'} Months
              </Text>
              <Text
                style={{
                  fontSize: RFValue(12),
                  color: '#808080',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                09/12/2020
              </Text>
            </>
          )}
        </AnimatedCircularProgress>
        <View
          style={{
            height: RFValue(120),
            width: '99%',
            paddingHorizontal: RFValue(10),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
            backgroundColor: 'white',
            borderRadius: RFValue(10),
          }}>
          <View
            style={{
              flex: 0.333,
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: RFValue(12),
                color: '#808080',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Current streak
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: '#808080',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              XX Days
            </Text>
          </View>
          <View
            style={{
              flex: 0.333,
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: RFValue(12),
                color: '#808080',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Max streak
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: '#808080',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              XX Days
            </Text>
          </View>
          <View
            style={{
              flex: 0.333,
              borderBottomWidth: 0.5,
              borderBottomColor: 'grey',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: RFValue(12),
                color: '#808080',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              Resets
            </Text>
            <Text
              style={{
                fontSize: RFValue(12),
                color: '#808080',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              2
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const deleteEmp = () => {};
  const saveEmp = () => {};
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Constants.Colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: RFValue(16),
      }}>
      <Header componentId={componentId} />
      <View style={{height: '85%'}}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Titles title={'Overview'} />
          <ActivityGraph />
          <Titles title={'Mood'} />
          <MoodMeter />
          <Titles title={'Goals & Milestones'} />
          <Soberity />
          <Employment />
          <Community />
          <Titles title={'Sober Tracker'} />
          <SoberTracker />
          <AddComunityModal
            addCommunityModal={addCommunityModal}
            setAddCommunityModal={setAddCommunityModal}
          />
          <AddEmploymentModal
            addEmploymentModal={addEmploymentModal}
            setAddEmploymentModal={setAddEmploymentModal}
            ampm={ampm}
            setampm={setampm}
            deleteEmp={deleteEmp}
            saveEmp={saveEmp}
          />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },

  chartStyle: {borderRadius: 16, marginTop: 16},
});

export default Tracker;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {agastyaList} from '../helper/constantData';
import {icons} from '../helper/IconConstant';

const AgastyaAI = () => {
  const keyboardHeight = useRef(0);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);
  const descriptionRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [discription, setDiscription] = useState('');
  const [agastyaText, setAgastyaText] = useState('');
  const [showAgastya, setShowAgastya] = useState(false);
  const [data, setData] = useState(null);
  const [listData, setListData] = useState(agastyaList);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', e => {
      keyboardHeight.current = e.endCoordinates.height;
      setIsVisible(true);
    });
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setIsVisible(false),
    );

    return () => {
      keyboardShowListener?.remove();
      keyboardHideListener?.remove();
    };
  }, []);

  const onPressKeyboard = () => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    } else {
      titleRef.current.focus();
    }
  };

  const onPressStar = () => setShowAgastya(!showAgastya);

  const onPressNext = () => {
    const selectedItem = listData.filter(i => i?.isSelected);
    if (selectedItem?.length === 0) {
      setIsError(true);
    } else {
      setIsError(false);
      fetch('https://dummyjson.com/products/1')
        .then(res => res.json())
        .then(res => setData(res));
    }
  };

  const onSelectionChange = event => {
    const start = event.nativeEvent.selection.start;
    const end = event.nativeEvent.selection.end;
    setAgastyaText(discription.substring(start, end));
  };

  const onPressClear = () => {
    setAgastyaText('');
    setData(null);
    setListData(agastyaList);
  };

  const renderItem = ({item}) => {
    const onSelectData = () => {
      const updatedData = agastyaList.map(i => ({
        ...i,
        isSelected: i.id === item.id,
      }));
      setListData(updatedData);
    };

    return (
      <TouchableOpacity onPress={onSelectData} style={styles.listItemView}>
        <Text style={{color: item.isSelected ? '#FF0C63' : '#8D8D8D'}}>
          {item.title}
        </Text>
        {item.isSelected && (
          <Image
            source={icons.select}
            style={styles.selectIcon}
            tintColor={'#FF0C63'}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.center}>
      <View style={styles.flexStyle}>
        <TextInput
          ref={titleRef}
          value={title}
          placeholder="Title"
          autoCorrect={false}
          returnKeyType="next"
          onChangeText={setTitle}
          onSubmitEditing={() => subTitleRef.current.focus()}
          keyboardType="visible-password"
        />
        <TextInput
          ref={subTitleRef}
          value={subTitle}
          placeholder="Sub Title"
          onChangeText={setSubTitle}
          keyboardType="visible-password"
          onSubmitEditing={() => descriptionRef.current.focus()}
        />
        <TextInput
          ref={descriptionRef}
          value={discription}
          placeholder="Write here..."
          keyboardType="visible-password"
          onChangeText={setDiscription}
          onSelectionChange={onSelectionChange}
          style={styles.textAreaStyle}
        />
      </View>
      {(isVisible || showAgastya) && (
        <KeyboardAvoidingView>
          <View style={styles.bottomView}>
            <TouchableOpacity onPress={onPressKeyboard}>
              <Image
                source={icons.keyboard}
                style={[styles.starIcon, styles.keyboardStyle]}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressStar}>
              <Image source={icons.star} style={styles.starIcon} />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      )}
      {showAgastya && (
        <View style={{height: keyboardHeight.current + 20}}>
          <View style={styles.agastyaTopView}>
            <Text>Ask Agastya AI</Text>
            <TouchableOpacity onPress={onPressNext}>
              <Image source={icons.next} style={styles.starIcon} />
            </TouchableOpacity>
          </View>
          <TextInput
            value={agastyaText}
            placeholder="Ask me or choose an option"
            style={styles.agastyaInput}
          />
          {isError && (
            <Text style={styles.errorTxt}>Sorry, Please select any option</Text>
          )}
          {data ? (
            <View>
              <Text style={styles.responseTxt}>{data.description}</Text>
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.buttoncontainer}
                  onPress={onPressClear}>
                  <Text style={styles.buttonTxt}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttoncontainer}
                  onPress={onPressNext}>
                  <Text style={styles.buttonTxt}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <FlatList
              data={listData}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-end',
  },
  flexStyle: {
    flex: 1,
  },
  starIcon: {
    width: 40,
    height: 40,
  },
  selectIcon: {
    width: 20,
    height: 20,
  },
  keyboardStyle: {
    marginRight: 10,
  },
  bottomView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textAreaStyle: {
    height: 250,
    textAlignVertical: 'top',
  },
  agastyaTopView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  agastyaInput: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'orange',
    paddingHorizontal: 20,
  },
  responseTxt: {
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: 'space-evenly',
  },
  buttoncontainer: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: '#8D8D8D',
    borderRadius: 10,
  },
  buttonTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  errorTxt: {
    color: 'red',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  listItemView: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default AgastyaAI;

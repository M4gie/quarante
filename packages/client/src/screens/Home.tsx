import React from 'react';
import { View } from 'react-native';

/* type Props = {
  navigation: HomeNavigationProp<'Home'>;
}; */

export default function Home(/* { navigation }: Props */) {
  /*   const [rooms, setRooms] = useState([]);
  let socket = null;

  useEffect(function mount() {
    socket = io(getEnv().serverUrl);
    socket.on('rooms', (data: any) => {
      setRooms(data);
    });
  }, []); */

  return (
    <View />
    /*     <View>
      <Text>Rooms:</Text>
      {rooms.map((room) => (
        <Text onPress={() => navigation.navigate('Room', { id: room.id })} key={room.id}>
          {room.theme}
        </Text>
      ))}
    </View> */
  );
}

/* const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`; */

import ContainerBackground from '@/components/ContainerBackground';
import HomeButton from '@/components/HomeButton';
import { StyleSheet, View } from "react-native";

export default function Index() {

  return (
    <View style={styles.container} >
      <ContainerBackground />

      <HomeButton path='/calculate/?operation=addition'
        title='Addition'
        iconName='plus'
        color='#011627'
      />
      <HomeButton path='/calculate/?operation=subtraction'
        title='Subtraction'
        iconName='minus'
        color='#2EC4B6'
      />
      <HomeButton path='/calculate/?operation=multiplication'
        title='Multiplication'
        iconName='asterisk'
        color='#E71D36'
      />
      <HomeButton path='/calculate/?operation=division'
        title='Division'
        iconName='divide'
        color='#FF9F1C'
      />


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

  },
  backgroundImage: {
    position: 'absolute', // This takes the image out of the normal component flow
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  }
})
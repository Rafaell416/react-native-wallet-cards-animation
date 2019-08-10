import React from 'react'
import { 
  StyleSheet, 
  View, 
  Animated,
  Dimensions,
  SafeAreaView
} from 'react-native'
import { cardHeight, cardTitle, cardPadding } from './constants'
const { height } = Dimensions.get("window")

const cards = [
  {
    name: "Shot",
    color: "#a9d0b6",
    price: "30 CHF"
  },
  {
    name: "Juice",
    color: "#e9bbd1",
    price: "64 CHF"
  },
  {
    name: "Mighty Juice",
    color: "#eba65c",
    price: "80 CHF"
  },
  {
    name: "Sandwich",
    color: "#95c3e4",
    price: "85 CHF"
  },
  {
    name: "Combi",
    color: "#1c1c1c",
    price: "145 CHF"
  },
  {
    name: "Signature",
    color: "#a390bc",
    price: "92 CHF"
  },
  {
    name: "Coffee",
    color: "#fef2a0",
    price: "47 CHF"
  }
]

class App extends React.Component {
  state = {
    y: new Animated.Value(0)
  }
  
  render() {
    const { y } = this.state
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            { cards.map((card, i) => {
              const inputRange = [-cardHeight, 0]
              const outputRange = [
                cardHeight * i,
                (cardHeight - cardTitle) * -i
              ]
              if (i > 0) {
                inputRange.push(cardPadding * i)
                outputRange.push((cardHeight - cardPadding) * -i)
              }
              const translateY = y.interpolate({
                inputRange,
                outputRange,
                extrapolateRight: "clamp"
              })
              return (
                <Animated.View
                  key={card.name}
                  style={{ transform: [{ translateY }] }}
                >
                  <View
                    style={[styles.card, { backgroundColor: card.color }]}
                  />
                </Animated.View>
              )
            })}
          </View>
          <Animated.ScrollView 
            scrollEventThrottle={16}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent:{contentOffset: { y }}
                }
              ],
              { useNativeDriver: true } // <-- Add this
            )}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 16
  },
  container: {
    flex: 1
  },
  card: {
    height: cardHeight,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  content: {
    height: height * 2
  },
})


export default App
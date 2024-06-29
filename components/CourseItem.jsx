import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getFormattedDate } from '../helpers/date'

export default function CourseItem({amount, date, description, id}) {
  return (
    <View>
      <Text>{description}</Text>
      <Text>{getFormattedDate(date)}</Text>
      <Text>{amount}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
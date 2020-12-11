import React from "react";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { View, Button, Share } from "react-native";

export default function WhatsAppShare() {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Hi you stranger, can you help me please",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View>
      <Button onPress={onShare} title="Share" />
    </View>
  );
}

import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Bai01BottomTab() {
  const tabs = [
    {
      label: 'Trang chủ',
      icon: 'home-outline',
      activeIcon: 'home',
    },
    {
      label: 'Danh mục',
      icon: 'grid-outline',
      activeIcon: 'grid',
    },
    {
      label: 'Giỏ hàng',
      icon: 'cart-outline',
      activeIcon: 'cart',
    },
    {
      label: 'Tài khoản',
      icon: 'person-outline',
      activeIcon: 'person',
    },
  ];

  return (
    <View style={styles.tabBar}>
      {tabs.map((tab, index) => {
        const active = index === 0;

        return (
          <View
            key={tab.label}
            style={[
              styles.tab,
              active && styles.activeTab,
            ]}
          >
            <Ionicons
              name={active ? tab.activeIcon : tab.icon}
              size={24}
              color={active ? '#1d4ed8' : '#555'}
            />

            <Text
              style={[
                styles.label,
                active && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    height: 72,

    flexDirection: 'row',
    backgroundColor: 'white',

    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tab: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTab: {
    backgroundColor: '#e0e7ff',
  },
  label: {
    marginTop: 4,
    fontSize: 12,
  },

  activeLabel: {
    fontWeight: 'bold',
  },
});
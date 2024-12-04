import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import {BASE_URL} from '../../ip_address'

const ManagerDash = () => {
  const [revenue, setRevenue] = useState(0);
  const [inventoryCount, setInventoryCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  const [inventoryModalVisible, setInventoryModalVisible] = useState(false);
  const [ordersModalVisible, setOrdersModalVisible] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const revenueResponse = await fetch(`${BASE_URL}/backend/revenues/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const revenueData = await revenueResponse.json();
        const totalRevenue = revenueData.reduce((sum, rev) => sum + rev.TotalAmount, 0);
        setRevenue(totalRevenue);

        const inventoryResponse = await fetch(`${BASE_URL}/backend/inventory/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const inventoryData = await inventoryResponse.json();
        setInventoryCount(inventoryData.length);

        const ordersResponse = await fetch(`${BASE_URL}/backend/orders/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const ordersData = await ordersResponse.json();
        setOrdersCount(ordersData.length);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Manager Dashboard</Text>

      {/* Revenue Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Revenue</Text>
        <Text style={styles.cardContent}>${revenue}</Text>
      </View>

      {/* Inventory Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Inventory Items</Text>
        <Text style={styles.cardContent}>{inventoryCount} items</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setInventoryModalVisible(true)}>
          <Text style={styles.buttonText}>Manage Inventory</Text>
        </TouchableOpacity>
      </View>

      {/* Orders Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Orders</Text>
        <Text style={styles.cardContent}>{ordersCount} orders</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setOrdersModalVisible(true)}>
          <Text style={styles.buttonText}>View Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Inventory Modal */}
      <Modal
        transparent={true}
        visible={inventoryModalVisible}
        onRequestClose={() => setInventoryModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Manage Inventory</Text>
            {/* You can add inventory management components here */}
            <Text>Inventory management content goes here...</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setInventoryModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Orders Modal */}
      <Modal
        transparent={true}
        visible={ordersModalVisible}
        onRequestClose={() => setOrdersModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>View Orders</Text>
            {/* You can add order management components here */}
            <Text>Order management content goes here...</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setOrdersModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8df1d3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ManagerDash;

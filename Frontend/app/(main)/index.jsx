import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar } from 'react-native-calendars';

export default function index() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);
    const [classType, setClassType] = useState('All Classes');
    const [quota, setQuota] = useState('General');

    const [showClassModal, setShowClassModal] = useState(false);
    const [showQuotaModal, setShowQuotaModal] = useState(false);

    // Add these constants after your state declarations
    const trainClasses = [
        'All Classes',
        '1A - First AC',
        '2A - Second AC',
        '3A - Third AC',
        'SL - Sleeper',
        'CC - Chair Car',
        '2S - Second Sitting'
    ];

    const quotaTypes = [
        'General',
        'Ladies',
        'Tatkal',
        'Premium Tatkal',
        'Senior Citizen',
        'Person with Disability',
        'Duty Pass'
    ];

    const handleDateSelect = (day) => {
        setDate(new Date(day.dateString));
        setShowCalendar(false);
    };

    const CalendarModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showCalendar}
            onRequestClose={() => setShowCalendar(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.calendarContainer}>
                    <View style={styles.calendarHeader}>
                        <Text style={styles.calendarTitle}>Select Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowCalendar(false)}
                            style={styles.closeButton}
                        >
                            <MaterialIcons name="close" size={24} color={Colors.light.text} />
                        </TouchableOpacity>
                    </View>
                    <Calendar
                        current={date.toISOString().split('T')[0]}
                        minDate={new Date().toISOString().split('T')[0]}
                        maxDate={new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [date.toISOString().split('T')[0]]: {
                                selected: true,
                                selectedColor: Colors.light.primary,
                            },
                        }}
                        theme={{
                            backgroundColor: '#ffffff',
                            calendarBackground: '#ffffff',
                            textSectionTitleColor: Colors.light.text,
                            selectedDayBackgroundColor: Colors.light.primary,
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: Colors.light.primary,
                            dayTextColor: Colors.light.text,
                            textDisabledColor: '#d9e1e8',
                            arrowColor: Colors.light.primary,
                            monthTextColor: Colors.light.text,
                            textMonthFontWeight: 'bold',
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 14,
                        }}
                    />
                </View>
            </View>
        </Modal>
    );
    // Add these components after your CalendarModal component
    const SelectionModal = ({ visible, onClose, title, options, selectedValue, onSelect }) => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.selectionModalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{title}</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color={Colors.light.text} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView style={styles.optionsList}>
                        {options.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.optionItem,
                                    selectedValue === option && styles.selectedOption
                                ]}
                                onPress={() => {
                                    onSelect(option);
                                    onClose();
                                }}
                            >
                                <Text style={[
                                    styles.optionText,
                                    selectedValue === option && styles.selectedOptionText
                                ]}>
                                    {option}
                                </Text>
                                {selectedValue === option && (
                                    <MaterialIcons name="check" size={24} color={Colors.light.primary} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header with Gradient */}
                <LinearGradient
                    colors={['#1e3c72', '#2a5298']}
                    style={styles.header}
                >
                    <View style={styles.headerContent}>
                        <Text style={styles.welcomeText}>Welcome to IRCTC</Text>
                        <Text style={styles.subText}>Book your journey with ease</Text>
                    </View>
                </LinearGradient>

                {/* Search Card */}
                <View style={styles.searchCard}>
                    {/* From-To Fields */}
                    <View style={styles.inputGroup}>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="location-on" size={24} color={Colors.light.tint} />
                            <TextInput
                                style={styles.input}
                                placeholder="From Station"
                                value={from}
                                onChangeText={setFrom}
                            />
                        </View>

                        {/* Swap Stations Button */}
                        <TouchableOpacity style={styles.swapButton} onPress={() => {
                            setFrom(to);
                            setTo(from);
                        }}>
                            <MaterialIcons name="swap-vert" size={24} color={Colors.light.tint} />
                        </TouchableOpacity>

                        <View style={styles.inputContainer}>
                            <MaterialIcons name="location-on" size={24} color={Colors.light.tint} />
                            <TextInput
                                style={styles.input}
                                placeholder="To Station"
                                value={to}
                                onChangeText={setTo}
                            />
                        </View>
                    </View>

                    {/* Date Selection */}
                    <TouchableOpacity style={styles.dateSelector} onPress={() => setShowCalendar(true)}>
                        <MaterialIcons name="event" size={24} color={Colors.light.tint} />
                        <Text style={styles.dateText}>
                            {date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </Text>
                    </TouchableOpacity>

                    {/* Class and Quota Selection */}
                    <View style={styles.selectionRow}>
                        <TouchableOpacity style={styles.selector} onPress={() => setShowClassModal(true)} >
                            <Text style={styles.selectorLabel}>Class</Text>
                            <View style={styles.selectorContent}>
                                <Text style={styles.selectorText}>{classType}</Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color={Colors.light.text} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.selector} onPress={() => setShowQuotaModal(true)}>
                            <Text style={styles.selectorLabel}>Quota</Text>
                            <View style={styles.selectorContent}>
                                <Text style={styles.selectorText}>{quota}</Text>
                                <MaterialIcons name="arrow-drop-down" size={24} color={Colors.light.text} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* Search Button */}
                    <TouchableOpacity style={styles.searchButton}>
                        <LinearGradient
                            colors={['#1e3c72', '#2a5298']}
                            style={styles.searchButtonGradient}
                        >
                            <Text style={styles.searchButtonText}>Search Trains</Text>
                            <MaterialIcons name="train" size={24} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <SelectionModal
                    visible={showClassModal}
                    onClose={() => setShowClassModal(false)}
                    title="Select Class"
                    options={trainClasses}
                    selectedValue={classType}
                    onSelect={setClassType}
                />

                <SelectionModal
                    visible={showQuotaModal}
                    onClose={() => setShowQuotaModal(false)}
                    title="Select Quota"
                    options={quotaTypes}
                    selectedValue={quota}
                    onSelect={setQuota}
                />
                {/* Quick Actions */}
                <View style={styles.quickActions}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionGrid}>
                        {[
                            { icon: 'confirmation-number', title: 'PNR Status' },
                            { icon: 'event-available', title: 'My Bookings' },
                            { icon: 'card-travel', title: 'Holiday Packages' },
                            { icon: 'restaurant', title: 'Order Food' },
                        ].map((action, index) => (
                            <TouchableOpacity key={index} style={styles.actionItem}>
                                <MaterialIcons name={action.icon} size={32} color={Colors.light.tint} />
                                <Text style={styles.actionText}>{action.title}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
            <CalendarModal />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // borderColor:"yellow",
        // borderWidth:2,
        flex: 1,
        marginTop: -30,
        padding: 0,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        //   borderColor:"red",
        //   borderWidth:2,
       
        padding: 20,
        // borderRadius: 30,
        marginHorizontal: 6,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        paddingVertical: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subText: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    searchCard: {
        backgroundColor: '#fff',
        margin: 16,
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 8,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: Colors.light.text,
    },
    swapButton: {
        alignSelf: 'center',
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },
    dateSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginBottom: 16,
    },
    dateText: {
        marginLeft: 8,
        fontSize: 16,
        color: Colors.light.text,
    },
    selectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    selector: {
        flex: 0.48,
    },
    selectorLabel: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    selectorContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    selectorText: {
        fontSize: 14,
        color: Colors.light.text,
    },
    searchButton: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    searchButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
    quickActions: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.light.text,
        marginBottom: 16,
    },
    actionGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionItem: {
        width: '48%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    actionText: {
        marginTop: 8,
        fontSize: 14,
        color: Colors.light.text,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    calendarContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingHorizontal: 4,
    },
    calendarTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    closeButton: {
        padding: 4,
    },
    selectionModalContent: {
        backgroundColor: '#fff',
        width: '90%',
        maxHeight: '70%',
        borderRadius: 16,
        padding: 16,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
      },
      modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.light.border,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.light.text,
      },
      optionsList: {
        maxHeight: '80%',
      },
      optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginVertical: 4,
      },
      selectedOption: {
        backgroundColor: Colors.light.primary + '15',
      },
      optionText: {
        fontSize: 16,
        color: Colors.light.text,
        flex: 1,
      },
      selectedOptionText: {
        color: Colors.light.primary,
        fontWeight: '500',
      },
      selectorContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: Colors.light.border,
      },
      selectorText: {
        fontSize: 15,
        color: Colors.light.text,
        flex: 1,
        marginRight: 8,
      },
});
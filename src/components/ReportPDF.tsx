"use client";

import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { Case, Clue } from '@/lib/firebase/schema';

// Styles for the PDF dossier
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#090909',
    padding: 40,
    color: '#F2F0EB',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4A95A',
    paddingBottom: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: '#D4A95A',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    color: '#F2F0EB',
    opacity: 0.6,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#D4A95A',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2C',
    paddingBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    fontSize: 10,
    lineHeight: 1.6,
    color: '#F2F0EB',
  },
  clueItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#111111',
    borderLeftWidth: 2,
    borderLeftColor: '#D4A95A',
  },
  clueTitle: {
    fontSize: 12,
    color: '#F2F0EB',
    marginBottom: 5,
  },
  clueContent: {
    fontSize: 9,
    color: '#F2F0EB',
    opacity: 0.8,
  }
});

interface ReportPDFProps {
  investigationCase: Case;
  clues: Clue[];
}

export const ReportPDF = ({ investigationCase, clues }: ReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>OFFICIAL DOSSIER: {investigationCase.title}</Text>
        <Text style={styles.subtitle}>CLASSIFIED - FOR EYES ONLY • ID: {investigationCase.id}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Executive Summary</Text>
        <Text style={styles.text}>{investigationCase.briefingText}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discovered Evidence</Text>
        {clues.map((clue, index) => (
          <View key={index} style={styles.clueItem}>
            <Text style={styles.clueTitle}>[{clue.type.toUpperCase()}] {clue.title}</Text>
            <Text style={styles.clueContent}>
              {clue.type === "image" ? "[ATTACHED MEDIA FILE]" : clue.content}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AI Analysis Synthesis</Text>
        <Text style={styles.text}>
          Based on the collected evidence, ShadowTrace AI confirms multiple overlapping indicators of compromise. 
          The extraction point and intercepted communications suggest highly coordinated activity.
        </Text>
      </View>
    </Page>
  </Document>
);

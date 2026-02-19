import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface MarkdownTextProps {
  content: string;
}

export function MarkdownText({ content }: MarkdownTextProps) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // H1 headers (# Header)
    if (line.startsWith('# ')) {
      elements.push(
        <Text key={key++} style={styles.h1}>
          {line.substring(2)}
        </Text>
      );
      continue;
    }

    // H2 headers (## Header)
    if (line.startsWith('## ')) {
      elements.push(
        <Text key={key++} style={styles.h2}>
          {line.substring(3)}
        </Text>
      );
      continue;
    }

    // H3 headers (### Header)
    if (line.startsWith('### ')) {
      elements.push(
        <Text key={key++} style={styles.h3}>
          {line.substring(4)}
        </Text>
      );
      continue;
    }

    // Bullet points (- item or • item)
    if (line.startsWith('- ') || line.startsWith('• ')) {
      const text = line.startsWith('- ') ? line.substring(2) : line.substring(2);
      elements.push(
        <View key={key++} style={styles.bulletContainer}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{parseInlineFormatting(text)}</Text>
        </View>
      );
      continue;
    }

    // Numbered lists (1. item)
    const numberedMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numberedMatch) {
      elements.push(
        <View key={key++} style={styles.bulletContainer}>
          <Text style={styles.bullet}>{numberedMatch[1]}.</Text>
          <Text style={styles.bulletText}>{parseInlineFormatting(numberedMatch[2])}</Text>
        </View>
      );
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      elements.push(<View key={key++} style={styles.spacer} />);
      continue;
    }

    // Regular paragraphs
    elements.push(
      <Text key={key++} style={styles.paragraph}>
        {parseInlineFormatting(line)}
      </Text>
    );
  }

  return <View style={styles.container}>{elements}</View>;
}

// Parse inline formatting like **bold**, *italic*, `code`
function parseInlineFormatting(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  let key = 0;

  // Match **bold**, *italic*, `code`
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }

    const matched = match[0];

    // Bold **text**
    if (matched.startsWith('**') && matched.endsWith('**')) {
      parts.push(
        <Text key={key++} style={styles.bold}>
          {matched.substring(2, matched.length - 2)}
        </Text>
      );
    }
    // Italic *text*
    else if (matched.startsWith('*') && matched.endsWith('*')) {
      parts.push(
        <Text key={key++} style={styles.italic}>
          {matched.substring(1, matched.length - 1)}
        </Text>
      );
    }
    // Code `text`
    else if (matched.startsWith('`') && matched.endsWith('`')) {
      parts.push(
        <Text key={key++} style={styles.code}>
          {matched.substring(1, matched.length - 1)}
        </Text>
      );
    }

    currentIndex = match.index + matched.length;
  }

  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 24,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 20,
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 26,
    color: '#333333',
    marginBottom: 12,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: '#333333',
    marginRight: 8,
    minWidth: 20,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    flex: 1,
  },
  bold: {
    fontWeight: '700',
    color: '#1A1A1A',
  },
  italic: {
    fontStyle: 'italic',
    color: '#555555',
  },
  code: {
    fontFamily: 'monospace',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 14,
    color: '#D63384',
  },
  spacer: {
    height: 8,
  },
});

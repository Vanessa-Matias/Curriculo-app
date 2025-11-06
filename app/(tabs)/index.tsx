import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Linking, TouchableOpacity, Platform } from 'react-native';
import { Briefcase, User, Code, Smartphone, Link, Mail, Github, Linkedin, BookOpen } from 'lucide-react-native';

// --- INTERFACES DE TIPAGEM PARA TSX ---
// Tipagem para componentes de ícone
type IconComponentType = React.ComponentType<any>;

interface Experience {
    id: number;
    title: string;
    company: string;
    duration: string;
    description: string;
    icon: any; 
}

interface CurriculumData {
    name: string;
    title: string;
    photoUrl: string;
    about: string;
    education: {
        course: string;
        institution: string;
        duration: string;
    };
    experience: Experience[];
    skills: string[];
    contact: {
        email: string;
        linkedin: string;
        github: string;
    };
}

// --- DADOS DO CURRÍCULO ---
const curriculumData: CurriculumData = {
    name: 'Vanessa Matias', 
    title: 'Estudante',
    // Usando uma foto placeholder. Substitua por uma URL de foto real!
    photoUrl: 'https://drive.google.com/uc?export=view&id=1j8er0tbCmtZD7cxlXV-E_e93nQrBsg8d', 
    
    // Resumo baseado no seu objetivo
    about: 'Estudante de Análise e Desenvolvimento de Sistemas (SENAC), com foco em pensamento analítico e transformação digital. Atualmente, atuo como Monitora do Laboratório de Inovação do Porto Digital e participante ativa em projetos premiados de tecnologia e impacto social.',

    education: {
        course: 'Análise e Desenvolvimento de Sistemas',
        institution: 'Faculdade Senac Pernambuco',
        duration: '2025 - Presente',
    },

    contact: {
        email: 'vanessamatias16.s@gmail.com',
        linkedin: 'https://www.linkedin.com/in/vanessamatiasdev/',
        github: 'https://github.com/Vanessa-Matias',
    },

    experience: [
        {
            id: 1,
            title: 'Residência Tecnológica em Robótica: Projeto MindCode',
            company: 'CETEC',
            duration: 'Ago 2025 - Presente',
            description: 'Desenvolvimento de um projeto educacional de lógica de programação para crianças (Ensino Fundamental I) usando o robô NAO V6. Foco em interações com sensores táteis, automação e raciocínio lógico.',
            icon: Code,
        },
        {
            id: 2,
            title: 'Monitora do Laboratório de Inovação do Embarque Digital',
            company: 'Porto Digital',
            duration: 'Ago 2025 - Presente',
            description: 'Suporte à gestão, manutenção e desenvolvimento de ambientes tecnológicos para educação e inovação. Atuação em suporte técnico de infraestrutura de TI e colaboração na organização de eventos de inovação.',
            icon: Briefcase,
        },
        {
            id: 3,
            title: 'Projeto Chico no Clima (Premiado)',
            company: 'SENAC',
            duration: 'Out 2024 - Out 2025',
            description: 'Fortalecimento do protagonismo juvenil em mudanças climáticas. Incluiu design interativo do "Caranguejo Robótico Chico", produção de conteúdo (Chico Sabido) e comunicação do projeto vencedor do Jovens no Clima 2025 (selecionado para COP 30).',
            icon: Link,
        },
    ],
    skills: ['Python', 'SQL (MySQL)', 'HTML/CSS', 'Excel', 'Git/GitHub', 'R', 'Pandas', 'NúmPy', 'Robótica', 'Inovação Tecnológica'],
};

// Configurações básicas de cores
const COLORS = {
  primary: '#28A745', // Verde escuro
  secondary: '#F1FFF1', // Fundo levemente esverdeado
  text: '#333333',
  background: '#FFFFFF',
  detail: '#6C757D',
};

// --- COMPONENTES AUXILIARES ---

interface SectionHeaderProps {
    title: string;
    IconComponent: IconComponentType;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, IconComponent }) => (
    <View style={styles.sectionHeader}>
        <IconComponent size={20} color={COLORS.primary} style={{ marginRight: 10 }} />
        <Text style={styles.sectionTitle}>{title}</Text>
    </View>
);

interface ExperienceItemProps {
    item: Experience;
}
const ExperienceItem: React.FC<ExperienceItemProps> = ({ item }) => (
  <View style={styles.experienceCard}>
    <item.icon size={20} color={COLORS.primary} style={{ marginRight: 15, marginTop: 4 }} />
    <View style={{ flex: 1 }}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.company}>{item.company} | {item.duration}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  </View>
);

interface ContactLinkProps {
    IconComponent: IconComponentType;
    text: string;
    url: string;
}
const ContactLink: React.FC<ContactLinkProps> = ({ IconComponent, text, url }) => (
    <TouchableOpacity style={styles.contactItem} onPress={() => Linking.openURL(url)}>
        <IconComponent size={20} color={COLORS.primary} />
        <Text style={styles.contactText}>{text}</Text>
    </TouchableOpacity>
);


// --- COMPONENTE PRINCIPAL ---
export default function CurriculumHomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={{ flex: 1, backgroundColor: COLORS.background }}>
      
      {/* Seção do Cabeçalho: Foto e Informações Pessoais */}
      <View style={styles.header}>
          <Image
          source={{ uri: curriculumData.photoUrl }}
          style={styles.profileImage}
          />
          <Text style={styles.name}>{curriculumData.name}</Text>
          <Text style={styles.title}>{curriculumData.title}</Text>
      </View>

      {/* Seção Sobre Mim */}
      <View style={styles.section}>
          <SectionHeader title="Objetivo / Resumo" IconComponent={User} />
          <Text style={styles.aboutText}>{curriculumData.about}</Text>
      </View>

      {/* Seção de Contato/Links */}
      <View style={styles.section}>
          <SectionHeader title="Contato e Perfis" IconComponent={Smartphone} />
          <View style={styles.contactContainer}>
              <ContactLink 
                  IconComponent={Mail}
                  text={curriculumData.contact.email}
                  url={`mailto:${curriculumData.contact.email}`}
              />
              <ContactLink 
                  IconComponent={Linkedin}
                  text="LinkedIn/vanessamatiasdev"
                  url={curriculumData.contact.linkedin}
              />
              <ContactLink 
                  IconComponent={Github}
                  text="GitHub/Vanessa-Matias"
                  url={curriculumData.contact.github}
              />
          </View>
      </View>
      
      {/* Seção de Formação */}
      <View style={styles.section}>
          <SectionHeader title="Formação Acadêmica" IconComponent={BookOpen} />
          <View style={styles.educationCard}>
                <BookOpen size={20} color={COLORS.primary} style={{ marginRight: 15, marginTop: 4 }} />
                <View style={{ flex: 1 }}>
                    <Text style={styles.jobTitle}>{curriculumData.education.course}</Text>
                    <Text style={styles.company}>{curriculumData.education.institution}</Text>
                    <Text style={styles.description}>{curriculumData.education.duration}</Text>
                </View>
            </View>
      </View>

      {/* Seção de Habilidades */}
      <View style={styles.section}>
          <SectionHeader title="Habilidades Técnicas (Skills)" IconComponent={Code} />
          <View style={styles.skillsContainer}>
              {curriculumData.skills.map((skill, index) => (
                  <Text key={index} style={styles.skillTag}>{skill}</Text>
              ))}
          </View>
      </View>
      
      {/* Seção de Experiência */}
      <View style={styles.section}>
          <SectionHeader title="Experiências e Projetos" IconComponent={Briefcase} />
          <View style={styles.experienceList}>
          {curriculumData.experience.map((item) => (
              <ExperienceItem key={item.id} item={item} />
          ))}
          </View>
      </View>
      
      {/* Espaço no final para evitar que o conteúdo fique colado na aba inferior */}
      <View style={{ height: Platform.OS === 'ios' ? 80 : 50 }} />
    </ScrollView>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 50,
  },
  header: {
    alignItems: 'center',
    paddingTop: Dimensions.get('window').height > 800 ? 50 : 30,
    paddingBottom: 30,
    backgroundColor: COLORS.secondary, 
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70, 
    marginBottom: 10,
    borderWidth: 4, 
    borderColor: COLORS.primary,
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: COLORS.detail,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  aboutText: {
    fontSize: 15,
    color: COLORS.text,
    lineHeight: 22,
    textAlign: 'justify',
  },
  // Estilos de Habilidades
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 5,
  },
  skillTag: {
    backgroundColor: COLORS.primary,
    color: COLORS.background,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '500',
    overflow: 'hidden',
  },
  // Estilos de Experiência e Formação (compartilhados)
  experienceList: {
    gap: 15,
  },
  experienceCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  educationCard: { // Estilo simples para Formação
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  company: {
    fontSize: 13,
    color: COLORS.detail,
    marginBottom: 5,
    fontWeight: '400',
  },
  description: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  // Estilos de Contato
  contactContainer: {
    marginTop: 5,
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  contactText: {
    fontSize: 15,
    color: COLORS.primary,
    textDecorationLine: 'underline', 
  }
});
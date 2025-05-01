import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Share, 
  Alert 
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/AppNavigator';

type ArticleDetailRouteProp = RouteProp<RootStackParamList, 'ArticleDetail'>;

// Placeholder data for articles
const MOCK_ARTICLES = {
  '1': {
    id: '1',
    title: 'Beneficios del CBD para el dolor crónico',
    type: 'long',
    content: `
El CBD, o cannabidiol, es uno de los muchos compuestos encontrados en la planta de cannabis. A diferencia del THC, el CBD no produce efectos psicoactivos, lo que significa que no causa la sensación de "estar drogado" asociada con el cannabis.

En los últimos años, el CBD ha ganado popularidad como un remedio natural para diversos problemas de salud, incluyendo el dolor crónico. Varios estudios han demostrado que el CBD puede ayudar a reducir el dolor al interactuar con los receptores del sistema endocannabinoide del cuerpo, que regula funciones como el sueño, el apetito, el dolor y la respuesta inmune.

## Cómo funciona el CBD para el dolor

El CBD interactúa con los receptores CB1 y CB2 del sistema endocannabinoide. Estos receptores son pequeñas proteínas adheridas a las células que reciben señales químicas y ayudan a las células a responder a diferentes estímulos.

El CBD no se une directamente a estos receptores, sino que influye en ellos indirectamente, potenciando los efectos de los endocannabinoides naturales del cuerpo. También interactúa con otros receptores, como los receptores de serotonina, que regulan el estado de ánimo y el dolor.

## Beneficios del CBD para diferentes tipos de dolor

### Dolor neuropático
El dolor neuropático es causado por daño en los nervios y puede ser difícil de tratar con medicamentos convencionales. Estudios han demostrado que el CBD puede ayudar a reducir este tipo de dolor al disminuir la inflamación y interactuar con los neurotransmisores.

### Dolor inflamatorio
La inflamación es una causa común de dolor. El CBD tiene propiedades antiinflamatorias que pueden ayudar a reducir la inflamación y, por lo tanto, el dolor asociado con condiciones como la artritis.

### Dolor crónico
Para personas que sufren de dolor crónico, el CBD puede ofrecer una alternativa a los medicamentos opioides, que pueden ser adictivos y tener efectos secundarios graves. El CBD no es adictivo y tiene pocos efectos secundarios.

## Formas de usar CBD para el dolor

Existen varias formas de usar CBD para el dolor:

1. **Aceites y tinturas**: Se colocan debajo de la lengua para una absorción rápida.
2. **Cápsulas**: Fáciles de tomar y proporcionan una dosis consistente.
3. **Tópicos**: Cremas, bálsamos y lociones que se aplican directamente en el área afectada.
4. **Comestibles**: Gominolas, chocolates y otros alimentos infundidos con CBD.

## Consideraciones importantes

Aunque el CBD es generalmente seguro, es importante tener en cuenta algunas consideraciones:

- Consulta con un profesional de la salud antes de comenzar a usar CBD, especialmente si estás tomando otros medicamentos.
- La calidad del producto es crucial. Busca productos que hayan sido probados por terceros.
- La dosis adecuada puede variar según la persona y la condición. Es recomendable comenzar con una dosis baja e ir aumentando gradualmente.

En conclusión, el CBD ofrece una opción prometedora para el manejo del dolor crónico, con menos efectos secundarios que muchos medicamentos convencionales. Sin embargo, se necesita más investigación para comprender completamente sus beneficios y limitaciones.
    `,
    image_url: 'https://via.placeholder.com/600x400',
    created_at: '2025-04-15T10:00:00',
    author: 'Dr. María Rodríguez',
  },
  '2': {
    id: '2',
    title: 'Guía rápida: Cómo usar aceite de CBD',
    type: 'short',
    content: `
# Guía rápida: Cómo usar aceite de CBD

El aceite de CBD es una de las formas más populares de consumir cannabidiol. Aquí te explicamos cómo usarlo correctamente para obtener los mejores resultados.

## Paso 1: Elige el aceite adecuado

No todos los aceites de CBD son iguales. Considera:

- **Concentración**: Los aceites vienen en diferentes concentraciones, desde 250mg hasta 5000mg o más.
- **Tipo de extracto**: Aislado (solo CBD), espectro completo (todos los cannabinoides) o amplio espectro (sin THC).
- **Calidad**: Busca productos probados por terceros y orgánicos si es posible.

## Paso 2: Determina la dosis correcta

La dosis ideal varía según la persona, la condición y la concentración del aceite. Comienza con una dosis baja (5-10mg) y aumenta gradualmente hasta encontrar la dosis que funcione para ti.

## Paso 3: Método de administración sublingual

1. Agita bien el frasco antes de usar.
2. Usa el gotero para medir la dosis deseada.
3. Coloca el aceite debajo de la lengua.
4. Mantén el aceite allí durante 60-90 segundos antes de tragar.

Este método permite que el CBD entre directamente al torrente sanguíneo a través de los vasos capilares debajo de la lengua, proporcionando efectos más rápidos.

## Paso 4: Consistencia

Para obtener los mejores resultados, usa el aceite de CBD de manera consistente. Muchas personas encuentran beneficioso tomarlo a la misma hora cada día.

## Consejos adicionales

- **Almacenamiento**: Guarda el aceite en un lugar fresco y oscuro para mantener su potencia.
- **Interacciones**: Consulta con un médico si estás tomando otros medicamentos, ya que el CBD puede interactuar con algunos de ellos.
- **Paciencia**: Los efectos del CBD pueden tardar tiempo en manifestarse, especialmente para condiciones crónicas.

Recuerda que el CBD afecta a cada persona de manera diferente, así que lo que funciona para otros puede no funcionar igual para ti. Escucha a tu cuerpo y ajusta según sea necesario.
    `,
    image_url: 'https://via.placeholder.com/600x400',
    created_at: '2025-04-10T14:30:00',
    author: 'Lic. Carlos Méndez',
  },
};

const ArticleDetail: React.FC = () => {
  const route = useRoute<ArticleDetailRouteProp>();
  const { articleId } = route.params;
  
  // In a real app, we would fetch the article from an API
  const article = MOCK_ARTICLES[articleId as keyof typeof MOCK_ARTICLES];
  
  if (!article) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Artículo no encontrado</Text>
      </View>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const handleShare = async () => {
    try {
      await Share.share({
        message: `Mira este artículo: ${article.title} - MUVO CBD App`,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el artículo');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: article.image_url }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{article.title}</Text>
        
        <View style={styles.metaContainer}>
          <Text style={styles.author}>{article.author}</Text>
          <Text style={styles.date}>{formatDate(article.created_at)}</Text>
        </View>
        
        <View style={styles.divider} />
        
        <Text style={styles.articleContent}>{article.content}</Text>
        
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShare}
        >
          <Text style={styles.shareButtonText}>Compartir Artículo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#ef4444',
    textAlign: 'center',
  },
  headerImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#111827',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  author: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  date: {
    fontSize: 14,
    color: '#6b7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginBottom: 16,
  },
  articleContent: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 24,
  },
  shareButton: {
    backgroundColor: '#4f46e5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ArticleDetail;

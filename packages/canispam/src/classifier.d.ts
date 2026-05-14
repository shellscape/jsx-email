declare module '@ladjs/naivebayes' {
  export interface NaiveBayesProbability {
    category: string;
    probability: number;
  }

  export interface NaiveBayesClassifier {
    categorize(text: string, probability?: false): string;
    categorize(text: string, probability: true): NaiveBayesProbability;
    probabilities(text: string): NaiveBayesProbability[];
    tokenizer: (text: string) => string[];
  }

  export interface NaiveBayesConstructor {
    fromJson(json: unknown, limit?: number): NaiveBayesClassifier;
  }

  const NaiveBayes: NaiveBayesConstructor;
  export default NaiveBayes;
}

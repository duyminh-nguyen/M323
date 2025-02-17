# 01_Einführung Aufgaben
# Lösungen zu den Aufgaben

## Aufgabe 1 - Imperativ vs. Deklarativ

### Imperativer Code-Stil
```java
public static int calculateScore(String word){
    int score = 0;
    for (char c : word.toCharArray()) {
        if (c != 'a') {
            score++;
        }
    }
    return score;
}
```

### Deklarativer Code-Stil
```java
public static int wordScore(String word){
    return (int) word.chars().filter(c -> c != 'a').count();
}
```

---

## Aufgabe 2 - Umsetzung einer Shopping Cart Funktion

### Imperative Lösung
```java
import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
    private List<String> items;
    private boolean bookAdded;

    public ShoppingCart() {
        this.items = new ArrayList<>();
        this.bookAdded = false;
    }

    public void addItem(String item) {
        items.add(item);
        if (item.equalsIgnoreCase("book")) {
            bookAdded = true;
        }
    }

    public void removeItem(String item) {
        items.remove(item);
        if (item.equalsIgnoreCase("book") && !items.contains("book")) {
            bookAdded = false;
        }
    }

    public List<String> getItems() {
        return new ArrayList<>(items);
    }

    public int getDiscountPercentage() {
        return bookAdded ? 5 : 0;
    }
}
```

### Funktionale Lösung
```java
import java.util.List;

public class ShoppingCartFunctional {
    public static int getDiscountPercentage(List<String> items) {
        return items.contains("book") ? 5 : 0;
    }
}
```

---

## Aufgabe 3 - TipCalculator (Pure Funktion)
```java
import java.util.List;

public class TipCalculator {
    public static int calculateTipPercentage(List<String> names) {
        if (names.isEmpty()) {
            return 0;
        } else if (names.size() > 5) {
            return 20;
        } else {
            return 10;
        }
    }
}
```

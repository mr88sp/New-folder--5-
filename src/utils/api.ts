export async function getSiteContent() {
  try {
    const response = await fetch(
      `${import.meta.env.API_BASE_URL}/api.php?request=content`
    );
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return json.data || {};
    } catch (e) {
      console.error("Failed to parse site content JSON:", e);
      console.error("Response text starts with:", text.substring(0, 100));
      return {};
    }
  } catch (e) {
    console.error("Failed to fetch site content:", e);
    return {};
  }
}

export async function getProducts(type?: string) {
  try {
    const apiBaseUrl = import.meta.env.API_BASE_URL || "http://localhost/SOHEILIMDF/admin";
    let url = `${apiBaseUrl}/api.php?request=products`;
    if (type) {
      url += `&type=${type}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      if (json.status === 'success' && Array.isArray(json.data)) {
          return json.data;
      }
      console.warn("API returned non-success or non-array data:", json);
      return [];
    } catch (e) {
      console.error("Failed to parse products JSON:", e);
      console.error("Response text starts with:", text.substring(0, 200));
      return [];
    }
  } catch (e) {
    console.error("Failed to fetch products from", import.meta.env.API_BASE_URL, ":", e);
    return [];
  }
}

export async function getCategories() {
  try {
    const response = await fetch(
      `${import.meta.env.API_BASE_URL}/api.php?request=categories`
    );
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return json.data || [];
    } catch (e) {
      console.error("Failed to parse categories JSON:", e);
      console.error("Response text starts with:", text.substring(0, 100));
      return [];
    }
  } catch (e) {
    console.error("Failed to fetch categories:", e);
    return [];
  }
}

export async function getSliderSlides() {
  try {
    const response = await fetch(
      `${import.meta.env.API_BASE_URL}/api.php?request=slider`
    );
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return json.data || [];
    } catch (e) {
      console.error("Failed to parse slider JSON:", e);
      return [];
    }
  } catch (e) {
    console.error("Failed to fetch slider slides:", e);
    return [];
  }
}

export async function getPriceTables() {
  try {
    const response = await fetch(
      `${import.meta.env.API_BASE_URL}/api.php?request=price_tables`
    );
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      return json.data || [];
    } catch (e) {
      console.error("Failed to parse price tables JSON:", e);
      return [];
    }
  } catch (e) {
    console.error("Failed to fetch price tables:", e);
    return [];
  }
}

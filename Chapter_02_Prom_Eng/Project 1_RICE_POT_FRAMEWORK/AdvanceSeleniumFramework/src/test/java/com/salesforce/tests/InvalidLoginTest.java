package com.salesforce.tests;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;
import com.salesforce.pages.LoginPage;
import io.github.bonigarcia.wdm.WebDriverManager;

public class InvalidLoginTest {
  private WebDriver driver;
  private LoginPage loginPage;
  private WebDriverWait wait;

  @BeforeTest
  public void setUp() {
    WebDriverManager.chromedriver().setup();
    driver = new ChromeDriver();
    driver.manage().window().maximize();
    loginPage = new LoginPage(driver);
    wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    loginPage.openLoginPage("https://login.salesforce.com/?locale=in");
  }

  @Test
  public void invalidLoginShouldDisplayError() {
    try {
      loginPage.doLogin("invalid.user@example.com", "InvalidPass123", false);
      wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath("//div[contains(@class,'error')]")));
      String error = loginPage.getErrorMessageText();
      Assert.assertTrue(error.toLowerCase().contains("check your username") || error.toLowerCase().contains("invalid"));
    } catch (Exception e) {
      Assert.fail(e.getMessage());
    }
  }

  @AfterTest
  public void tearDown() {
    try {
      if (driver != null) {
        driver.quit();
      }
    } catch (Exception e) {
      throw new RuntimeException("Unable to close browser", e);
    }
  }
}

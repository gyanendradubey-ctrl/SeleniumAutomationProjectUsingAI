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

public class ValidLoginTest {
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
  public void validLoginShouldSucceed() {
    try {
      String username = System.getProperty("salesforce.username", "valid.user@example.com");
      String password = System.getProperty("salesforce.password", "ValidPassword123");
      loginPage.doLogin(username, password, true);
      boolean success = wait.until(ExpectedConditions.or(
          ExpectedConditions.urlContains("/home"),
          ExpectedConditions.visibilityOfElementLocated(By.xpath("//a[contains(text(),'Logout') or contains(@href,'logout')]"))));
      Assert.assertTrue(success);
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

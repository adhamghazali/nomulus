// Copyright 2017 The Nomulus Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package google.registry.tools;

import static com.google.common.truth.Truth.assertThat;
import static org.mockito.Mockito.mock;

import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpRequestFactory;
import com.google.api.client.http.HttpRequestInitializer;
import google.registry.config.RegistryConfig;
import google.registry.testing.SystemPropertyRule;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

@RunWith(JUnit4.class)
public class RequestFactoryModuleTest {

  private final GoogleCredential googleCredential = mock(GoogleCredential.class);

  @Rule public final SystemPropertyRule systemPropertyRule = new SystemPropertyRule();

  @Before
  public void setUp() {
    RegistryToolEnvironment.UNITTEST.setup(systemPropertyRule);
  }

  @Test
  public void test_provideHttpRequestFactory_localhost() {
    // Make sure that localhost creates a request factory with an initializer.
    RegistryConfig.CONFIG_SETTINGS.get().appEngine.isLocal = true;
    HttpRequestFactory factory = RequestFactoryModule.provideHttpRequestFactory(googleCredential);
    HttpRequestInitializer initializer = factory.getInitializer();
    assertThat(initializer).isNotNull();
    assertThat(initializer).isNotSameAs(googleCredential);
  }

  @Test
  public void test_provideHttpRequestFactory_remote() {
    // Make sure that example.com creates a request factory with the UNITTEST client id but no
    RegistryConfig.CONFIG_SETTINGS.get().appEngine.isLocal = false;
    HttpRequestFactory factory = RequestFactoryModule.provideHttpRequestFactory(googleCredential);
    assertThat(factory.getInitializer()).isSameAs(googleCredential);
  }
}

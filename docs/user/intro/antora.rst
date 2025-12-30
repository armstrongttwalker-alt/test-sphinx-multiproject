
Deploying Antora on Read the Docs
=================================

.. meta::
   :description lang=en: Hosting Antora documentation on Read the Docs.

`Antora`_ is a static site generator for creating documentation sites from AsciiDoc content.

Minimal configuration is required to build an existing Antora project on Read the Docs.

.. code-block:: yaml
   :caption: .readthedocs.yaml

    version: 2

    build:
        os: ubuntu-lts-latest
        tools:
            nodejs: latest
        jobs:
          install:
            - npm i -g @antora/cli@3.1 @antora/site-generator@3.1
          build:
            html:
              - antora --fetch antora-playbook.yml --to-dir $READTHEDOCS_OUTPUT/html

.. _Antora: https://antora.org/

Getting Started
---------------

- If you have an existing Antora project you want to host on Read the Docs, check out our :doc:`/intro/add-project` guide.
- If you're new to Antora, check out the official `Getting Started with Antora`_ guide.

.. _Getting Started with Antora: https://docs.antora.org/antora/latest/install-and-run-quickstart/

Example Repository and Demo
---------------------------

Example repository
    https://github.com/readthedocs/test-builds/tree/antora

Demo
    https://test-builds.readthedocs.io/en/antora/

Further Reading
---------------

* `Antora documentation`_

.. _Antora documentation: https://docs.antora.org/antora/latest/




```bash
-------------Nvidia A800平台上容器创建命令参考---------------------------------------
sudo docker run -itd \
                --name flagscale-flagcx-test \
                --privileged \
                --net=host \
                --pid=host \
                --cap-add=ALL \
                --shm-size 128G \
                --ulimit memlock=-1 \
                --gpus all \
                -v /dev/:/dev/ \
                -v /usr/src/:/usr/src/ \
                -v /lib/modules/:/lib/modules/ \
                -v /nfs/changtao/:/workspace/ \
                flagscale_xlc:cuda12.4.1-cudnn9.5.0-python3.12-torch2.6.0-time2504161115-ssh \
                /bin/bash
                
-------------Kunlunxin P800平台上容器创建命令参考--------------------------------------- 
sudo docker run -itd \
        --name flagcx-test-wuh \
        --privileged \
        --net=host \
        --pid=host \
        --shm-size 128G \
        --ulimit memlock=-1 \
        --group-add video \
        -v /public-nvme/changtao/:/root/workspace \
        -v /usr/local/xpu/:/usr/local/xpu \
        flagcx_kunlunxin_base:v1.1 \
        /bin/bash    
-------------cambricon-mlu590平台上容器创建命令参考---------------------------------------
sudo docker run -itd \
        --name flagcx-test-wuh \
        --privileged \
        --net=host \
        --pid=host \
        --shm-size 128G \
        --ulimit memlock=-1 \
        --group-add video \
        -v /share/project/changtao:/workspace \
        flagcx_mlu:0707 \
        /bin/bash                 
```
